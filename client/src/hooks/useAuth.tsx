import {useContext} from "react";
import AuthContext from "../context/AuthProvider.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useIsAuthenticated = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth)
    if (!auth) {
        return false;
    }

    return auth.token && auth.userState;
}

