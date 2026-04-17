import express from "express";
import helmet from "helmet";
import cors from "cors";
import ratelimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import documentRoutes from "./routes/documents.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { configurePassport } from "./config/passport.js";
import passport from "passport";

const app = express();
const port = process.env.PORT || 3000;

configurePassport();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

const apiLimiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

app.use("api", apiLimiter);

// If anything crashes in our routes, this catches it instead of killing the Node process
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Server Error: ", err.message || err);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  },
);
app.use(passport.initialize());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Ok", message: "SaaS Backend is alive" });
});

app.use("/api/auth", authRoutes);
app.use("api/v1/documents", documentRoutes);
app.use("/api/v1/chat", chatRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
