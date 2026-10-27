import express from "express";

import {
  saveFeedback,
  getFeedback,
  deleteFeedback
} from "../controllers/feedbackController";
import authMiddleware from "../middleware/authMiddleware";

const router =
  express.Router();
  router.post(
  "/",
  saveFeedback
);
router.use(authMiddleware)


router.get(
  "/",
  getFeedback
);

router.delete(
  "/:id",
  deleteFeedback
);

export default router;