import { body, query } from "express-validator";
import { Category, Occurrence, Type } from "@shared/types/entry-definitions";

const add_entry_validator = [
  body("title").trim()
    .notEmpty().withMessage("Title is required").bail()
    .isString().withMessage("Title must be a string"),

  body("category").trim()
    .notEmpty().withMessage("Category is required").bail()
    .isString().withMessage("Category must be a string").bail()
    .isIn(Object.values(Category)).withMessage("Invalid category"),

  body("occurrence").trim()
    .notEmpty().withMessage("Occurrence is required").bail()
    .isString().withMessage("Occurrence must be a string").bail()
    .isIn(Object.values(Occurrence)).withMessage("Invalid occurrence"),

  body("type").trim()
    .notEmpty().withMessage("Type is required").bail()
    .isString().withMessage("Type must be a string").bail()
    .isIn(Object.values(Type)).withMessage("Invalid type"),
];
const delete_entry_validator = [body("entry_id").isString().notEmpty().withMessage("Invalid entry.")];

export { add_entry_validator, delete_entry_validator };
