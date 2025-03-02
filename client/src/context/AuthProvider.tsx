import React, { createContext, useEffect, useState } from "react";
import {
  AuthContextType,
  defaultAuthContext,
} from "../types/AuthContextType.ts";
import useRefreshToken from "../hooks/useRefreshToken.tsx";

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<{
    token?: string;
    userState?: object;
  } | null>(null);
  const [loading, setLoading] = useState(true); // loading state. We want to refresh token before the loading finishes

  const refreshToken = useRefreshToken();

  useEffect(() => {
    (async () => {
      try {
        const { token, userState } = await refreshToken();
        setAuth({ token, userState });
      } catch (err) {
        setAuth(null);
      } finally {
        setLoading(false); // Done loading
      }
    })();
  }, []);

  // Use an effect to log state updates
  useEffect(() => {
    console.log("AUTH UPDATED IS ", auth);
  }, [auth]); // Runs whenever auth changes

  if (loading) {
    return <div>Loading...</div>; // Show loading until token is refreshed
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
