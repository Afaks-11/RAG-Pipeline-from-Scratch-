import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as z from "zod";

import { CONFIG } from "../../config/config.js";
import { eq } from "drizzle-orm";
import { db } from "../../database/index.js";
import { users } from "../../database/schema/users.js";

export class AuthService {
  /**
   * Hashes the password and saves the new user to the database
   */
  static async registerUser(email: string, passwordRaw: string) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      throw new Error("EMAIL IN USE");
    }

    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        authProvider: "email",
      })
      .returning();

    return newUser;
  }

  /**
   * Verifies credentials and generates a JWT token.
   */
  static async loginUser(email: string, passwordRaw: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user || !user.passwordHash) {
      throw new Error("Invalid Credentials");
    }

    const isValid = await bcrypt.compare(passwordRaw, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      CONFIG.JWT,
      { expiresIn: "1h" },
    );

    return { user, token };
  }
}
