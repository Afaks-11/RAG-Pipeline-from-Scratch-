import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { CONFIG } from "../../config/config.js";

export class OAuthController {
  static async googleCallback(req: Request, res: Response): Promise<void> {
    const user = req.user as { id: string; email: string };

    const frontendUrl = CONFIG.FRONTEND_URL;

    if (!user) {
      res.redirect(`${frontendUrl}/login?error=auth_failed`);
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      CONFIG.JWT!,
      { expiresIn: "1h" },
    );

    // 2. Redirect to the frontend, passing the token securely
    // (In production, consider passing this via an HttpOnly cookie instead of URL)
    res.redirect(`${frontendUrl}/auth-success?token=${token}`);
  }
}
