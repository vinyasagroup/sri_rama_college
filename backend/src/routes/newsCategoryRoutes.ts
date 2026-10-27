import express from "express";

import {

  saveNewsCategory,
  getNewsCategory,
  updateNewsCategory,
  deleteNewsCategory

} from "../controllers/newsCategoryController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();
router.get(
  "/",
  getNewsCategory
);

router.use(authMiddleware)
router.post(
  "/",
  saveNewsCategory
);



router.put(
  "/:id",
  updateNewsCategory
);

router.delete(
  "/:id",
  deleteNewsCategory
);

export default router;