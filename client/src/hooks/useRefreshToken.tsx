import {useAuth} from "./useAuth.tsx";
import {createApiClientConfig} from "../utils/helpers.ts";
import ServerUrl from "../interfaces/ServerUrl.ts";
import axios from "axios";


const useRefreshToken = () => {
    const {setAuth} = useAuth();
    // new client that attaches cookies on every request
    const apiClient = axios.create(
        createApiClientConfig({url: ServerUrl.API_PROXY, sendCookies: true}
        ));

    return async () => {
        const res = await apiClient.post(ServerUrl.REFRESH_TOKEN_API)
        console.log("Retrieved new token");
        setAuth(prev => {
            return {...prev, token: res.data.token};
        })

        return res.data.token;
    };
}

export default useRefreshToken;