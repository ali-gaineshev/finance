import * as express from "express";
import { LoginJWTPayload } from "../types";
import { Express } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user: LoginJWTPayload;
  }
}
