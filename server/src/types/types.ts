import { JwtPayload } from "jsonwebtoken";

type VerifyUserResponse = {
  isMatch: boolean;
  username: string | null;
  uuid: string | null;
};

interface LoginJWTPayload extends JwtPayload {
  uuid: string | null;
  email: string | null;
  name: string | null;
  credentials_flag: string | null;
}

export { VerifyUserResponse, LoginJWTPayload };
