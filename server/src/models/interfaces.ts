import {JwtPayload} from "jsonwebtoken";

class HTTP_CODE {
    static OK = 200;
    static CREATED = 201;
    static ACCEPTED = 202;
    static NO_CONTENT = 204;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static INTERNAL_SERVER_ERROR = 500;
    static SERVICE_UNAVAILABLE = 503;
}

class JWT_TOKEN_CREDENTIALS_TYPE {
    static LOGIN = "login_credentials";
    static REFRESH = "refresh_credentials";
}

interface VerifyUserResponse {
    isMatch: boolean;
    username: string | null;
    uuid: string | null;
}

interface LoginJWTPayload extends JwtPayload {
    uuid: string | null;
    email: string | null;
    name: string | null;
    credentials_flag: string | null;
}

export {
    HTTP_CODE,
    JWT_TOKEN_CREDENTIALS_TYPE,
    VerifyUserResponse,
    LoginJWTPayload
}