import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ResponseDTO from "@shared/dto/response";
import { HTTP_CODE } from "@shared/types/common-enums";
import { generateValidationErrorResponse } from "../services/util";
import { CommonErrorMessage } from "@shared/types/common-error";

// Check for validation errors
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err_response = generateValidationErrorResponse(errors);
    res.status(HTTP_CODE.BAD_REQUEST).json(
      new ResponseDTO({
        success: false,
        message: CommonErrorMessage.VALIDATION_ERROR,
        error: err_response,
      }),
    );
    return;
  }
  next(); // Continue if no errors
};
