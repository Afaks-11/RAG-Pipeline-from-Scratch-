import type { Request, Response, NextFunction } from "express";
import { PasswordService } from "../services/password.service.js";

export class PasswordController {
  static async requestOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }

       await PasswordService.generateOtp(email);
       res.status(200).json({
         message: "If that email exists, an OTP has been sent.",
       });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) {
        res
          .status(400)
          .json({ error: "Email, OTP, and new password are required" });
        return;
      }

      await PasswordService.resetPassword(email, otp, newPassword);
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
      if (error.message === "INVALID OTP") {
        res.status(400).json({ error: "Invalid or expired OTP" });
        return;
      }
      next(error);
    }
  }
}
