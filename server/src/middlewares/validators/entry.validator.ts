import { body, query } from "express-validator";

const add_entry_validator = [
  query("category").isString().notEmpty().withMessage("Category is required"),
  query("occurrence").isString().notEmpty().withMessage("_ is required"),
  query("type").isString().notEmpty().withMessage("Type is required"),
];

const delete_entry_validator = [body("entry_id").isString().notEmpty().withMessage("Invalid entry.")];

export { add_entry_validator, delete_entry_validator };
