import express from "express";
import {
  saveApplication,
  getApplications,
  updateApplicationStatus,
  getDashboardCounts
} from "../controllers/applicationController";
import {
  getMonthlyApplications,
} from "../controllers/applicationController";
import {
  getRecentApplications
} from "../controllers/applicationController";


import { getCourseWiseStats } from "../controllers/applicationController";
import authMiddleware from "../middleware/authMiddleware";
const router =
  express.Router();
router.get(
  "/",
  getApplications
);
router.post(
  "/",
  saveApplication
);
router.use(authMiddleware)
router.put("/status/:id",updateApplicationStatus);
router.get("/dashboard-counts", getDashboardCounts);
router.get("/course-wise-stats", getCourseWiseStats);
router.get("/monthly-applications", getMonthlyApplications);
router.get("/recent-applications", getRecentApplications
);

export default router;