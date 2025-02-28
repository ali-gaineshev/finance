// auth
import { useAuth } from "./useAuth.tsx";
// api client
import { authApiClient } from "../api/ApiClient.ts";
// type checker
import { isRefreshResponse } from "@shared/type-guard/user.checker.ts";
// enums
import BACKEND_ENDPOINT from "@shared/types/endpoints.ts";
import { RefreshResponse } from "@shared/types/common-response.ts";
import ResponseDTO from "@shared/dto/response.ts";
import { HTTP_CODE } from "@shared/types/common-enums.ts";
import { CommonErrorMessage } from "@shared/types/common-message.ts";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  return async () => {
    const response = await authApiClient.post(
      BACKEND_ENDPOINT.REFRESH_TOKEN_FULL_PATH,
    );
    const res = response.data as ResponseDTO<RefreshResponse>;
    const data = res.data;

    if (
      response.status !== HTTP_CODE.OK ||
      !res.success ||
      !isRefreshResponse(data)
    ) {
      throw new Error(CommonErrorMessage.ERROR);
    }

    // set new token
    setAuth((prev) => {
      console.log(prev);
      return {
        ...prev,
        token: data.token,
      };
    });

    return data.token;
  };
};

export default useRefreshToken;
