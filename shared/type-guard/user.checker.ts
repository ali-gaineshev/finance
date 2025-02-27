import { LoginResponse } from "../types/common-response";

function isLoginResponse(data: any): data is LoginResponse {
  return (
    data && typeof data === "object" && "token" in data && "userState" in data
  );
}

export { isLoginResponse };
