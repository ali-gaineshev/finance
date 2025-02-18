/* Express */
import express from "express";
const router = express.Router();
/* Controller */
import UserController from "../controllers/user-controllers";
/* Middleware */
import { loginValidation, registrationValidation } from "../middlewares/validators/user.validator";
import { validateRequest } from "../middlewares/validateRequest";

router.post("/register", registrationValidation, validateRequest, UserController.register);

router.post("/login", loginValidation, validateRequest, UserController.login);

router.post("/logout", UserController.logout);

router.post("/refresh_token", UserController.refresh_token);

export default router;
