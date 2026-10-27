import express from "express";

import {
  saveGalleryCategory,
  getGalleryCategory,
  updateGalleryCategory,
  deleteGalleryCategory
} from "../controllers/galleryCategoryController";
import authMiddleware from "../middleware/authMiddleware";

const router =
  express.Router();
  router.get(
  "/",
  getGalleryCategory
);
router.use(authMiddleware)
router.post(
  "/",
  saveGalleryCategory
);



router.put(
  "/:id",
  updateGalleryCategory
);

router.delete(
  "/:id",
  deleteGalleryCategory
);

export default router;