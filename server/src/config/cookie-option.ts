import Config from "./config";

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "strict" | "lax" | "none" | undefined;
  maxAge?: number;
}

export const REFRESH_TOKEN_COOKIE = "refresh_token";

export const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: Config.NODE_ENV === "PROD",
  sameSite: "strict", // 'PROD' ? 'none' : 'none' requires secure:\
};

export const defaultCookieOptionsWithMaxAge: CookieOptions = {
  httpOnly: true,
  secure: Config.NODE_ENV === "PROD",
  sameSite: "strict", // 'PROD' ? 'none' : 'none' requires secure:\
  maxAge: Config.REFRESH_TOKEN_EXPIRY_SECONDS,
};
