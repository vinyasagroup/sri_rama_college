import express from "express";
import upload from "../middleware/uploadMiddleware";

import {
  saveLogo,
  getLogo,
  updateLogo,
  deleteLogo
} from "../controllers/logoController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
router.get(
  "/",
  getLogo
);

router.use(authMiddleware)
router.post(
  "/",
  upload.single("logo"),
  saveLogo
);


router.put(
  "/:id",
  upload.single("logo"),
  updateLogo
);

router.delete(
  "/:id",
  deleteLogo
);

export default router;