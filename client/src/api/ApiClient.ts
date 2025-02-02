import axios, {AxiosInstance} from 'axios';

import ServerUrl from "../interfaces/ServerUrl.ts";
import {createApiClientConfig} from "../utils/helpers.ts";

const backendApiUrl = ServerUrl.API_PROXY;

const simpleApiConfig = createApiClientConfig({url: backendApiUrl, sendCookies: false});
export const globalApiClient: AxiosInstance = axios.create(simpleApiConfig);

// the difference between 2 is that private one has an interceptor with attaching the token
const apiConfigWithCredentials = createApiClientConfig({url: backendApiUrl, sendCookies: false});
export const privateApiClient: AxiosInstance = axios.create(apiConfigWithCredentials);


// export const useApiClient = ({ useAuth = false, withCredentials = false }: { useAuth?: boolean; withCredentials?: boolean }): AxiosInstance => {
//     const authHeader: string = "";
//
//     const customConfig: ApiClientConfig = { ...apiClientConfig, headers: { ...apiClientConfig.headers } };
//
//     if (useAuth && authHeader) {
//         customConfig.headers['Authorization'] = authHeader.trim();
//     }
//
//     if (withCredentials) {
//         customConfig.withCredentials = withCredentials;
//     }
//
//     const apiClient = axios.create(customConfig);
//
//
//     return apiClient;
// };
