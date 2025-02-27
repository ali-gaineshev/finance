import BACKEND_ENDPOINT from "@shared/types/endpoints.ts";

class BACKEND {
  static readonly URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  static readonly REGISTER =
    BACKEND_ENDPOINT.USER_API + BACKEND_ENDPOINT.REGISTER;
  static readonly LOGIN = BACKEND_ENDPOINT.USER_API + BACKEND_ENDPOINT.LOGIN;
  static readonly LOGOUT = BACKEND_ENDPOINT.USER_API + BACKEND_ENDPOINT.LOGOUT;
  static readonly REFRESH_TOKEN =
    BACKEND_ENDPOINT.USER_API + BACKEND_ENDPOINT.REFRESH_TOKEN;

  static readonly ADD_ENTRY =
    BACKEND_ENDPOINT.ENTRY_API + BACKEND_ENDPOINT.ADD_ENTRY;
  static readonly GET_ENTRIES =
    BACKEND_ENDPOINT.ENTRY_API + BACKEND_ENDPOINT.GET_ENTRIES;
  static readonly DELETE_ENTRY =
    BACKEND_ENDPOINT.ENTRY_API + BACKEND_ENDPOINT.DELETE_ENTRY;
}

export default BACKEND;
