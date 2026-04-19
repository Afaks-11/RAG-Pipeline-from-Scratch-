import bcrypt from "bcrypt";

import { eq } from "drizzle-orm";
import { db } from "../../database/index.js";
import { users } from "../../database/schema/users.js";
import { redisClient } from "../../config/redis.js";

export class PasswordService {
  static async generateOtp(email: string): Promise<string> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      // We return true anyway to prevent "Email Enumeration" hacker attacks
      return "OK";
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const redisReady = redisClient?.isOpen;
    if (redisReady) {
      await redisClient.setEx(`otp:${email}`, 600, otp);
    } else {
      throw new Error("Redis Offline");
    }

    console.log(`\n [Email Mock] Sending OTP ${otp} to ${email}\n`);
    return "OK";
  }

  static async resetPassword(
    email: string,
    otp: string,
    newPasswordRaw: string,
  ) {
    const redisReady = redisClient?.isOpen;
    if (!redisReady) throw new Error("Redis Offline");

    const storedOtp = await redisClient.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      throw new Error("INVALID OTP");
    }

    const passwordHash = await bcrypt.hash(newPasswordRaw, 10);

    await db.update(users).set({ passwordHash }).where(eq(users.email, email));

    await redisClient.del(`otp:${email}` as string);

    return true;
  }
}
