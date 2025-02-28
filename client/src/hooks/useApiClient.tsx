import { authApiClient } from "../api/ApiClient.ts";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken.tsx";
import { useAuth } from "./useAuth.tsx";
import type { InternalAxiosRequestConfig } from "axios";
import { HTTP_CODE } from "@shared/types/common-enums.ts";

// Extend InternalAxiosRequestConfig to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const useApiClient = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = authApiClient.interceptors.request.use(
      (config) => {
        // first attempt
        console.log("Attempting too send request. Is token null? ", auth);
        if (!config.headers.get("Authorization")) {
          config.headers.set("Authorization", `Bearer ${auth?.token}`);
        }

        return config;
      },
      (error) => {
        console.log("Caught error");
        Promise.reject(error);
      },
    );

    const responseIntercept = authApiClient.interceptors.response.use(
      (response) => response,
      async (err): Promise<any> => {
        const prevRequest: CustomAxiosRequestConfig = err?.config;

        if (
          err?.response?.status === HTTP_CODE.FORBIDDEN &&
          !prevRequest?._retry
        ) {
          prevRequest._retry = true;
          const newAccessToken = await refresh();
          prevRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
          return;
        }

        return Promise.reject(err);
      },
    );

    return () => {
      // clean up interceptor
      authApiClient.interceptors.request.eject(requestIntercept);
      authApiClient.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return authApiClient;
};

export default useApiClient;
