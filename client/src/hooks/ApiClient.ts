import axios, {AxiosInstance} from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';


const backend_api = import.meta.env.VITE_BACKEND_SERVER_URL;

export const useAuthApiClient = (): AxiosInstance => {
    const authHeader = useAuthHeader(); // Hook to get the token

    return axios.create({
        baseURL: backend_api,
        timeout: 10000,
        headers: {
            Authorization: `Bearer ${authHeader}`,
            'Content-Type': 'application/json',
        },
    });
};

export const usePublicApiClient = (): AxiosInstance => {
    return axios.create({
        baseURL: backend_api,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
