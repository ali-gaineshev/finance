import React, { createContext, useState } from "react";
import {
  AuthContextType,
  defaultAuthContext,
} from "../types/AuthContextType.ts";

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<{
    token?: string;
    userState?: object;
  } | null>(null);
  console.log("AUTH IS ", auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
