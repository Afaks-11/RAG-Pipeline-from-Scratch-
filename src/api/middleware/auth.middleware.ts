import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/config.js";

export interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    Array.isArray(authHeader) ||
    !authHeader.startsWith("Bearer ")
  ) {
    res
      .status(401)
      .json({ error: "Unauthorized Missing or invalid token format" });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    throw new Error("Invalid token format");
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token!, CONFIG.JWT || "") as unknown as {
      userId: string;
      email: string;
    };

    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: "Unauthorized: Token is expired or invalid" });
  }
};
