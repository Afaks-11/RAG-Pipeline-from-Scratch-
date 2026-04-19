import { Router } from "express";
import passport from "passport";

import { ChatController } from "../controller/chat.controller.js";

const router = Router();

const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/", requireAuth, ChatController.chat);
router.get("/history", requireAuth, ChatController.getHistory);

export default router;
