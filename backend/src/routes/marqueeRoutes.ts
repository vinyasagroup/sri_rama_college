import express from "express";

import {
  saveMarquee,
  getMarquee,
  updateMarquee,
  deleteMarquee
} from "../controllers/marqueeController";
import authMiddleware from "../middleware/authMiddleware";

const router =
  express.Router();
  router.get(
  "/",
  getMarquee
);
router.use(authMiddleware)
router.post(
  "/",
  saveMarquee
);



router.put(
  "/:id",
  updateMarquee
);

router.delete(
  "/:id",
  deleteMarquee
);

export default router;