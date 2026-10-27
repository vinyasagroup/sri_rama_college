import express from "express";
import multer from "multer";

import {
  saveCarousel,
  getCarousel,
  getCarouselById,
  updateCarousel,
  deleteCarousel,
} from "../controllers/carouselController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});



// ================= Get All Carousel =================

router.get(
  "/",
  getCarousel);
router.use(authMiddleware)

// ================= Save Carousel =================

router.post(
  "/",
  upload.single("carouselImage"),
  saveCarousel
);
// ================= Get Carousel By Id =================

router.get("/:id",
  getCarouselById
);

// ================= Update Carousel =================

router.put(
  "/:id",
  upload.single("carouselImage"),
  updateCarousel
);

// ================= Delete Carousel =================

router.delete(
  "/:id",
  deleteCarousel
);

export default router;