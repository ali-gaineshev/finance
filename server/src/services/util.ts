import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import Config from "../config/config";
import {ValidationErrorMessage} from "@shared/interfaces/validation-error"
/**
 * Hashes the provided password using bcrypt.
 *
 * @param password - The plain text password to hash.
 * @returns A promise that resolves to the hashed password.
 */
const hashPassword = (password: string): Promise<string> => {
    const saltRounds = Config.SALT_ROUNDS; // Salt rounds determine the complexity of the hash
    return bcrypt.hash(password, saltRounds);
};

/**
 * Verifies if the provided input password matches the hashed password.
 *
 * @param inputPassword - The plain text password entered by the user.
 * @param hashedPassword - The hashed password stored in the database.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
const verifyPassword = (inputPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(inputPassword, hashedPassword);
};

/**
 * Generates a JWT access token.
 *
 * @param payload - The data to encode in the token.
 * @returns The signed JWT token.
 */
const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, Config.ACCESS_TOKEN_SECRET as Secret, { expiresIn: Config.ACCESS_TOKEN_EXPIRY } as SignOptions);
};

/**
 * Generates a JWT refresh token.
 *
 * @param payload - The data to encode in the token.
 * @returns The signed JWT token.
 */
const generateRefreshToken = (payload: string | object): string => {
    return jwt.sign(payload, Config.REFRESH_TOKEN_SECRET as Secret, { expiresIn: Config.REFRESH_TOKEN_EXPIRY } as SignOptions);
};

/**
 * Generates a structured validation error response.
 *
 * @param errors - The validation errors from express-validator.
 * @returns A formatted error response object.
 */
const generateValidationErrorResponse = (errors: any): ValidationErrorMessage => {
    const err = errors.array()[0];
    return { error: { message: err.msg, value: err.path } };
};

export {
    generateAccessToken,
    generateRefreshToken,
    hashPassword,
    verifyPassword,
    generateValidationErrorResponse
};
