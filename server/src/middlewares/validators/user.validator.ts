import { body } from "express-validator";

const registrationValidation = [
  // Validate input fields
  body("email").trim().isEmail().withMessage("Email is invalid"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Name must only contain letters"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  // Validate input fields
  body("email").trim().notEmpty().withMessage("Email is invalid"),
  body("password").trim().notEmpty().withMessage("Password is empty"),
];

export { registrationValidation, loginValidation };
