// auth
import { useContext } from "react";
import AuthContext from "../context/AuthProvider.tsx";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useIsAuthenticated = () => {
  const { auth } = useAuth();

  return !!(auth && auth.token);
};
