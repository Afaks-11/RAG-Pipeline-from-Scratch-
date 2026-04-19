import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

import { db } from "../../database/index.js";
import { users } from "../../database/schema/users.js";
import { OAuthService } from "../services/oauth.service.js";

dotenv.config();

export const configurePassport = () => {
  // 1. GOOGLE STRATEGY
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `http://localhost:${process.env.PORT || 3000}/api/auth/google/callback`,
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
    secretOrKey: process.env.JWT_SECRET || "your_super_secret_jwt_key_here",
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
