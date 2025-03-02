import axios, { AxiosInstance } from "axios";

import { createApiClientConfig } from "../utils/helpers.ts";
import { BACKEND_URL } from "./BackendDefinitions.ts";

const authApiConfig = createApiClientConfig({
  url: BACKEND_URL,
  sendCookies: true,
});
export const apiClient: AxiosInstance = axios.create(authApiConfig);
