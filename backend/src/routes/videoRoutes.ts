import express from "express";

import {
  saveVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// ================= GET =================

router.get(
  "/",
  getVideos
);

// ================= ADMIN AUTH =================

router.use(authMiddleware);

// ================= SAVE =================

router.post(
  "/",
  saveVideo
);

// ================= UPDATE =================

router.put(
  "/:id",
  updateVideo
);

// ================= DELETE =================

router.delete(
  "/:id",
  deleteVideo
);

export default router;