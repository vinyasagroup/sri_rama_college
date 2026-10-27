import express from "express";

import upload
from "../middleware/uploadMiddleware";

import {
  saveGalleryImage,
  getGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} from "../controllers/galleryImageController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();

router.get(
  "/",
  getGalleryImage
);
router.use(authMiddleware)
router.post(
  "/",
  upload.single("image"),
  saveGalleryImage
);


router.put(
  "/:id",
  upload.single("image"),
  updateGalleryImage
);

router.delete(
  "/:id",
  deleteGalleryImage
);

export default router;