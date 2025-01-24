import axios, { AxiosInstance } from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const backend_api = import.meta.env.REACT_APP_BACKEND_API;

export const useApiClient = () => {
    const authHeader = useAuthHeader(); // Hook to get the token

    // Authenticated Axios instance
    const authClient: AxiosInstance = axios.create({
        baseURL: backend_api,
        timeout: 10000,
        headers: {
            Authorization: `Bearer ${authHeader}`,
            'Content-Type': 'application/json',
        },
    });

    // Public Axios instance
    const publicClient: AxiosInstance = axios.create({
        baseURL: backend_api,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return { authClient, publicClient };
};
