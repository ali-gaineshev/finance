import React, { createContext, useState } from "react";
import {AuthContextType} from "../interfaces/AuthContextType.ts";

const AuthContext = createContext<AuthContextType>({
    auth: {
        token: undefined,
        userState: undefined,
    },
    setAuth: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;