import React, { createContext, useState } from "react";
import {AuthContextType} from "../interfaces/AuthContextType.ts";

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const [auth, setAuth] = useState({});
    console.log(auth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;