import { JwtPayload } from "jsonwebtoken";

type VerifyUserResponse = {
  isMatch: boolean;
  username: string | null;
  uuid: string | null;
};

interface LoginJWTPayload extends JwtPayload {
  uuid: string;
  email: string;
  name: string;
  credentials_flag: string;
}

export { VerifyUserResponse, LoginJWTPayload };
