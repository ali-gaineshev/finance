// api client
import { apiClient } from "../api/ApiClient.ts";
// type checker
import { isRefreshResponse } from "@shared/type-guard/user.checker.ts";
// enums
import BACKEND_ENDPOINT from "@shared/types/endpoints.ts";
import { RefreshResponse } from "@shared/types/common-response.ts";
import ResponseDTO from "@shared/dto/response.ts";
import { HTTP_CODE } from "@shared/types/common-enums.ts";
import { CommonErrorMessage } from "@shared/types/common-message.ts";

const useRefreshToken = () => {
  return async () => {
    const response = await apiClient.post(
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

    return { token: data.token, userState: data.userState } as RefreshResponse;
  };
};

export default useRefreshToken;
