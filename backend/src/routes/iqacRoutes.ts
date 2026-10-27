import express from "express";

import {

saveCategory,
getCategories,
updateCategory,
deleteCategory,


}

from "../controllers/iqacController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();
router.get(
"/category",
getCategories
);

router.use(authMiddleware)
/* CATEGORY */

router.post(
"/category",
saveCategory
);


router.put(
  "/category/:id",
  updateCategory
);

router.delete(
  "/category/:id",
  deleteCategory
);


export default router;