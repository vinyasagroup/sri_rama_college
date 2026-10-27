import express from "express";

import {
  getCourses,
  getCourseByKey,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import authMiddleware from "../middleware/authMiddleware";

const router =
  express.Router();
  router.get(
  "/",
  getCourses
);

router.get(
  "/:courseKey",
  getCourseByKey
);
router.use(authMiddleware)
router.post(
  "/add",
  createCourse
);

router.put(
  "/:id",
  updateCourse
);

router.delete(
  "/:id",
  deleteCourse
);

export default router;