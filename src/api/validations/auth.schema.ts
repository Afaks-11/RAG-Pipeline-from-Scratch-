import { z } from "zod";

/**
 * Zod v4 uses top-level z.email() and unified { error: ... } messages.
 * We use .pipe() to combine string transformations (trim/lowercase)
 * with the strict email schema.
 */
const emailSchema = z
  .email({ error: "Invalid email address format" })
  .trim()
  .toLowerCase();

const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long" });

export const registerSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, { error: "Password is required" }),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: emailSchema,
    otp: z.string().length(6, { error: "OTP must be exactly 6 digits" }),
    newPassword: passwordSchema,
  }),
});
