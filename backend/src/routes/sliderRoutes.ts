import express from "express";

import upload from "../middleware/uploadMiddleware";

import {
  saveSlider,
  getSlider,
  updateSlider,
  deleteSlider,
} from "../controllers/sliderController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// ================= GET ALL =================

router.get(
  "/",
  getSlider
);

// Protect all routes below
router.use(authMiddleware);

// ================= SAVE =================

router.post(
  "/",
  upload.single("image"),
  saveSlider
);

// ================= UPDATE =================

router.put(
  "/:id",
  upload.single("image"),
  updateSlider
);

// ================= DELETE =================

router.delete(
  "/:id",
  deleteSlider
);

export default router;