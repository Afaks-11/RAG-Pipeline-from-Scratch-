import { Router } from "express";
import multer from "multer";
import passport from "passport";

import { DocumentController } from "../controller/document.controller.js";

const router = Router();

// Configure Multer to save files to the local temp directory
const upload = multer({
  dest: "temp/",
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.filename === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF file are allowed"));
    }
  },
});

const requireAuth = passport.authenticate("jwt", { session: false });

router.post(
  "/upload",
  requireAuth,
  upload.single("file"),
  DocumentController.uploadDocument,
);
router.get("/", requireAuth, DocumentController.listDocuments);
router.delete("/:id", requireAuth, DocumentController.deleteDocument);

export default router;
