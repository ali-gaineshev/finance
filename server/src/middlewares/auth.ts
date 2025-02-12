import jwt from 'jsonwebtoken';
import { HTTP_CODE } from '../models/interfaces';
import {ResponseDTO} from "@shared/dto/response";
import express from "express";
import Config from "../config/config";
import {LoginJWTPayload} from "../models/interfaces";

/**
 * Middleware function to authenticate JWT token.
 *
 * This middleware verifies the JWT token provided in the `Authorization` header.
 * If the token is valid, the user data is attached to the `req.user` object, and
 * the request proceeds to the next middleware or route handler.
 * If the token is invalid or expired, it returns an error response with an
 * appropriate status code and message.
 *
 * @param {Request} req - The request object that contains the headers and other data.
 * @param {Response} res - The response object used to send a response back to the client.
 * @param {NextFunction} next - The function to call to pass control to the next middleware or route handler.
 */
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Getss token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(HTTP_CODE.UNAUTHORIZED).json(
            new ResponseDTO({success: false, message: 'Access denied. No token provided. Log in first'}).toJSON()
        );
    }

    try {
        req.user = jwt.verify(token, Config.ACCESS_TOKEN_SECRET) as LoginJWTPayload;  // Attach user data to the request object
        next();  // Proceed to the original func
    } catch (err) {

        return res.status(HTTP_CODE.FORBIDDEN).json(
            new ResponseDTO({success: false, message: 'Invalid or expired token', error: err}).toJSON()
        );
    }
};

export default {
    authenticateToken,
}
