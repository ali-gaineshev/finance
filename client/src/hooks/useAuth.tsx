import {useContext} from "react";
import AuthContext from "../context/AuthProvider.tsx";

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useIsAuthenticated = () => {
    const { auth } = useContext(AuthContext);
    console.log(`useIsAuthenticated: ${!!auth?.token}`);
    console.log(auth);
    console.log('--------------')

    return !!auth?.token;

}

