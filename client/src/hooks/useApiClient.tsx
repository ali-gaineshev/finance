import { apiClient } from "../api/ApiClient.ts";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken.tsx";
import { useAuth } from "./useAuth.tsx";
import { HttpStatusCode } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { AuthContextType } from "../types/AuthContextType.ts";

// Extend InternalAxiosRequestConfig to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const usePrivateApiClient = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth() as AuthContextType;

  useEffect(() => {
    const requestIntercept = apiClient.interceptors.request.use(
      (config) => {
        // first attempt
        if (!config.headers.get("Authorization")) {
          config.headers.set("Authorization", `Bearer ${auth?.token}`);
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    const responseIntercept = apiClient.interceptors.response.use(
      (response) => response,
      async (err): Promise<any> => {
        const prevRequest: CustomAxiosRequestConfig = err?.config;
        //@ts-ignore
        if (
          err?.response?.status === HttpStatusCode.Forbidden &&
          !prevRequest?._retry
        ) {
          //@ts-ignore
          prevRequest._retry = true;
          const newAccessToken = await refresh();
          prevRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
          return apiClient(prevRequest);
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

export default usePrivateApiClient;
