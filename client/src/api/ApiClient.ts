import axios, { AxiosInstance } from "axios";

import { createApiClientConfig } from "../utils/helpers.ts";
import BACKEND from "./BACKEND.ts";

const simpleApiConfig = createApiClientConfig({
  url: BACKEND.URL,
  sendCookies: true,
});
export const apiClient: AxiosInstance = axios.create(simpleApiConfig);

const authApiConfig = createApiClientConfig({
  url: BACKEND.URL,
  sendCookies: true,
});
export const authApiClient: AxiosInstance = axios.create(authApiConfig);
