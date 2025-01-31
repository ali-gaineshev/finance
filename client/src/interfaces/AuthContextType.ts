import React from "react";

export interface AuthContextType{
    auth: { token?: string; userState?: object };
    setAuth: React.Dispatch<React.SetStateAction<{ token?: string; userState?: object }>>;
}