import axios, { AxiosInstance } from 'axios';
const backendApiUrl = '/api';

interface ApiClientConfig {
    baseURL: string;
    timeout: number;
    headers: Record<string, string>; // Allow arbitrary string keys for headers
    withCredentials: boolean;
}

const apiClientConfig: ApiClientConfig = {
    baseURL: backendApiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
};

export const globalApiClient = axios.create(apiClientConfig);

export const useApiClient = ({ useAuth = false, withCredentials = false }: { useAuth?: boolean; withCredentials?: boolean }): AxiosInstance => {
    const authHeader: string = "";

    const customConfig: ApiClientConfig = { ...apiClientConfig, headers: { ...apiClientConfig.headers } };

    if (useAuth && authHeader) {
        customConfig.headers['Authorization'] = authHeader.trim();
    }

    if (withCredentials) {
        customConfig.withCredentials = withCredentials;
    }

    const apiClient = axios.create(customConfig);


    return apiClient;
};
