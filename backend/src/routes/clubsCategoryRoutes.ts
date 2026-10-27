import express from "express";

import {

  saveClubsCategory,
  getClubsCategory,
  updateClubsCategory,
  deleteClubsCategory,

} from "../controllers/clubsCategoryController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/",
  getClubsCategory
);
router.use(authMiddleware)
router.post(
  "/",
  saveClubsCategory
);
router.put(
  "/:id",
  updateClubsCategory
);

router.delete(
  "/:id",
  deleteClubsCategory
);

export default router;