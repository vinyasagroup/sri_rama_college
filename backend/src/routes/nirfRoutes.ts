import express from "express";

import upload from "../middleware/uploadMiddleware";

import {

  saveNIRF,

  getNIRF,

  updateNIRF,

  deleteNIRF

} from "../controllers/nirfController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();
router.get(
  "/",
  getNIRF
);

router.use(authMiddleware)
router.post(
  "/",
  upload.single("document"),
  saveNIRF
);

router.put(
  "/:id",
  upload.single("document"),
  updateNIRF
);

router.delete(
  "/:id",
  deleteNIRF
);

export default router;