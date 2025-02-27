import { useContext } from "react";
import AuthContext from "../context/AuthProvider.tsx";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useIsAuthenticated = () => {
  const { auth } = useAuth();
  console.log("--------------");
  console.log(`auth object is ${auth}`);
  console.log(`useIsAuthenticated returned: ${!!(auth && auth.token)}`);
  console.log("--------------");

  return !!(auth && auth.token);
};
