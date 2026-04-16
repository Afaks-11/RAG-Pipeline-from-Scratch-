import { Router } from "express";

import { PasswordController } from "../controller/password.controller.js";
import { AuthController } from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/auth.schema.js";

const router = Router();

// Standard Login/Register
router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  PasswordController.requestOtp,
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  PasswordController.resetPassword,
); 

export default router;
