import express from "express";
import upload from "../middleware/uploadMiddleware";
import {
  saveAICTE,
  getAICTE,
  updateAICTE,
  updateAICTEStatus,
  deleteAICTE
} from "../controllers/aicteController";
import authMiddleware from "../middleware/authMiddleware";

const router =
  express.Router();
router.get(
  "/",
  getAICTE
);

router.use(authMiddleware)
router.post(
  "/",
  upload.single("document"),
  saveAICTE
);

router.put(
  "/:id",
  upload.single("document"),
  updateAICTE
);

router.delete(
  "/:id",
  deleteAICTE
);

router.put(
  "/:id/status",
  updateAICTEStatus
);

export default router;