import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

import { db } from "../database/index.js";
import { users } from "../database/schema/users.js";
import { OAuthService } from "../api/services/oauth.service.js";
import { CONFIG } from "./config.js";

dotenv.config();

export const configurePassport = () => {
  // 1. GOOGLE STRATEGY
  passport.use(
    new GoogleStrategy(
      {
        clientID: CONFIG.GOOGLE_CLIENT_ID!,
        clientSecret: CONFIG.GOOGLE_CLIENT_SECRET!,
        callbackURL: `http://localhost:${CONFIG.PORT}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await OAuthService.findOrCreateGoogleUser(profile);
          return done(null, user);
        } catch (err) {
          return done(err as Error, undefined);
        }
      },
    ),
  );

  // 2. JWT STRATEGY
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.JWT,
  };
  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const id = jwtPayload.userId || jwtPayload.id;

        const [user] = await db.select().from(users).where(eq(users.id, id));

        if (user) {
          return done(null, { userId: user.id, email: user.email });
        }

        return done(null, false);
      } catch (error) {
        console.error("[Passport] JWT Validation Error:", error);
        return done(error, false);
      }
    }),
  );
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj: any, done) => done(null, obj));
};
