import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { error } from "node:console";

export class AuthController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const user = await AuthService.registerUser(email, password);
      res.status(201).json({
        message: "User resgistered successfully",
        userId: user!.id,
      });
    } catch (err: any) {
      if (err.message === "EMAIL IN USE") {
        res.status(409).json({ error: "Email is already registered" });
        return;
      }
      next(err);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const { user, token } = await AuthService.loginUser(email, password);

      res.status(200).json({
        message: "Login successful",
        token,
        userId: user.id,
      });
    } catch (error: any) {
      if (error.message === "Invalid Credentials") {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      next(error);
    }
  }
}
