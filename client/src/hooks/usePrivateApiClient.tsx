import {privateApiClient} from "../api/ApiClient.ts";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken.tsx";
import {useAuth} from "./useAuth.tsx";
import { HttpStatusCode} from "axios";
import type { InternalAxiosRequestConfig } from 'axios'

const usePrivateApiClient = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = privateApiClient.interceptors.request.use(
            config => {
                // first attempt
                if(!config.headers.get('Authorization')){
                    config.headers.set("Authorization", `Bearer ${auth?.token}`);
                }

                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        )

        const responseIntercept = privateApiClient.interceptors.response.use(
            response => response,
            async (err): Promise<any> => {
                const prevRequest: InternalAxiosRequestConfig = err?.config;
                //@ts-ignore
                if (err?.response?.status === HttpStatusCode.Forbidden && !prevRequest?._retry){
                    //@ts-ignore
                    prevRequest._retry = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
                    return privateApiClient(prevRequest);
                }

                return Promise.reject(err);
            }
        );

        return () => {
            // clean up interceptor
            privateApiClient.interceptors.request.eject(requestIntercept);
            privateApiClient.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh]);

    return privateApiClient;
}

export default usePrivateApiClient;