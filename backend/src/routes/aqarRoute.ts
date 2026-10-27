import express from "express";

import upload from "../middleware/uploadMiddleware";

import {
  saveAQAR,
  getAQAR,
  updateAQAR,
  deleteAQAR,
} from "../controllers/aqarController";
import authMiddleware from "../middleware/authMiddleware";

const router =
  express.Router();

router.get(
  "/",
  getAQAR
);
router.use(authMiddleware)
router.post(
  "/",
  upload.single("document"),
  saveAQAR
);
router.put(
  "/:id",
  upload.single("document"),
  updateAQAR
);

router.delete(
  "/:id",
  deleteAQAR
);

export default router;