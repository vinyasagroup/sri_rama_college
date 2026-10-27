import express from "express";

import upload from "../middleware/uploadMiddleware";

import {

  saveNAAC,

  getNAAC,

  updateNAAC,

  deleteNAAC

} from "../controllers/naacController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();
router.get(
  "/",
  getNAAC
);
router.use(authMiddleware)
router.post(
  "/",
  upload.single("document"),
  saveNAAC
);

router.put(
  "/:id",
  upload.single("document"),
  updateNAAC
);

router.delete(
  "/:id",
  deleteNAAC
);

export default router;