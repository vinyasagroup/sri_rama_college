import express from "express";

import upload from "../middleware/uploadMiddleware";

import {
  saveFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController";

import authMiddleware from "../middleware/authMiddleware";

const router =
  express.Router();

router.get(
  "/",
  getFaculty
);
router.use(authMiddleware);
router.post(
  "/",upload.single("faculty_photo"),saveFaculty);

router.put(
  "/:id",
  upload.single("faculty_photo"),
  updateFaculty
);
router.delete(
  "/:id",
  deleteFaculty
);
export default router;