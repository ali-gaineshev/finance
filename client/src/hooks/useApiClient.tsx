// api
import { apiClient } from "../api/ApiClient.ts";
import type { InternalAxiosRequestConfig } from "axios";
// hooks
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken.tsx";
import { useAuth } from "./useAuth.tsx";
// enums
import { HTTP_CODE } from "@shared/types/common-enums.ts";

// Extend InternalAxiosRequestConfig to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const useApiClient = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = apiClient.interceptors.request.use(
      (config) => {
        // first attempt
        console.log("Attempting too send request. Is token null? ", auth);
        if (!config.headers.get("Authorization") && auth && auth.token) {
          console.log("Set Auth Headers");
          config.headers.set("Authorization", `Bearer ${auth.token}`);
        }

        return config;
      },
      (error) => {
        console.log("Caught error");
        Promise.reject(error);
      },
    );

    const responseIntercept = apiClient.interceptors.response.use(
      (response) => response,
      async (err): Promise<any> => {
        const prevRequest: CustomAxiosRequestConfig = err?.config;

        if (
          err?.response?.status === HTTP_CODE.UNAUTHORIZED &&
          !prevRequest?._retry
        ) {
          prevRequest._retry = true; // Mark request as retried

          try {
            const { token: newAccessToken, userState: userState } =
              await refresh();
            setAuth((prev) => {
              return {
                ...prev,
                userState: userState,
                token: newAccessToken,
              };
            });
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Retry the request with the new token
            return apiClient(prevRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(err);
      },
    );

    return () => {
      // clean up interceptor
      apiClient.interceptors.request.eject(requestIntercept);
      apiClient.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return apiClient;
};

export default useApiClient;
