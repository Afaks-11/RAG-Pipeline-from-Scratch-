import { eq } from "drizzle-orm";
import type { Profile } from "passport-google-oauth20";

import { db } from "../../database/index.js";
import { users } from "../../database/schema/users.js";

export class OAuthService {
  static async findOrCreateGoogleUser(profile: Profile) {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error("No email associated with this Google account");
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser) {
      if (!existingUser.googleId) {
        const [updatedUser] = await db
          .update(users)
          .set({ googleId: profile.id, authProvider: "google" })
          .where(eq(users.id, existingUser.id))
          .returning();
        return updatedUser;
      }
      return existingUser;
    }

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        googleId: profile.id,
        authProvider: "google",
      })
      .returning();

    return newUser;
  }
}
