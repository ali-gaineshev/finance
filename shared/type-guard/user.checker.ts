import { LoginResponse, RefreshResponse } from "../types/common-response";

function isLoginResponse(data: any): data is LoginResponse {
  return (
    data && typeof data === "object" && "token" in data && "userState" in data
  );
}

function isRefreshResponse(data: any): data is RefreshResponse {
  return (
    data && typeof data === "object" && "token" in data && "userState" in data
  );
}

export { isLoginResponse, isRefreshResponse };
