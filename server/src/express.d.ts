import * as express from "express";
import { LoginJWTPayload } from "../models/interfaces";

declare module "express-serve-static-core" {
    interface Request {
        user?: LoginJWTPayload;
    }
}