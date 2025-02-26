/* Express */
import express from "express";
const router = express.Router();
/* Controller */
import UserController from "../controllers/user-controllers";
/* Middleware */
import { loginValidation, registrationValidation } from "../middlewares/validators/user.validator";
import { validateRequest } from "../middlewares/validateRequest";
import BACKEND_ENDPOINT from "@shared/types/endpoints";

router.post(BACKEND_ENDPOINT.REGISTER, registrationValidation, validateRequest, UserController.register);

router.post(BACKEND_ENDPOINT.LOGIN, loginValidation, validateRequest, UserController.login);

router.post(BACKEND_ENDPOINT.LOGOUT, UserController.logout);

router.post(BACKEND_ENDPOINT.REFRESH_TOKEN, UserController.refresh_token);

export default router;
