import express from "express";
import upload from "../middleware/uploadMiddleware"; // ✅ add this

import {
  getTestimonials,
  getTestimonialById,
  saveTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialsController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
router.get("/", getTestimonials);
router.use(authMiddleware)

router.get("/:id", getTestimonialById);

router.post("/", upload.single("testimonial_photo"), saveTestimonial);

router.put("/:id", upload.single("testimonial_photo"), updateTestimonial);

router.delete("/:id", deleteTestimonial);

export default router;