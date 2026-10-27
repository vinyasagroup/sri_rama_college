import express from "express";

import {
  saveAQARCommittee,
  getAQARCommittee,
  updateAQARCommittee,
  deleteAQARCommittee

} from "../controllers/aqarCommitteeController";
import authMiddleware from "../middleware/authMiddleware";
const router =
express.Router();
router.get(
  "/",
  getAQARCommittee
);
router.use(authMiddleware)
router.post(
  "/",
  saveAQARCommittee
);

router.put(
  "/:id",
  updateAQARCommittee
);

router.delete(
  "/:id",
  deleteAQARCommittee
);

export default router;