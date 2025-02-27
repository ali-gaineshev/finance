import { useAuth } from "./useAuth.tsx";
import { createApiClientConfig } from "../utils/helpers.ts";
import axios from "axios";
import { AuthContextType } from "../types/AuthContextType.ts";
import BACKEND from "../api/BACKEND.ts";

const useRefreshToken = () => {
  const { setAuth } = useAuth() as AuthContextType;
  // new client that attaches cookies on every request
  const apiClient = axios.create(
    createApiClientConfig({
      url: BACKEND.URL,
      sendCookies: true,
    }),
  );

  return async () => {
    const res = await apiClient.post(BACKEND.REFRESH_TOKEN);
    console.log("Retrieving new token");
    setAuth((prev) => {
      return { ...prev, token: res.data.token };
    });

    return res.data.token;
  };
};

export default useRefreshToken;
