import express from "express";

import upload
from "../middleware/uploadMiddleware";

import {

saveGoverningBody,
getGoverningBody,
updateGoverningBody,
deleteGoverningBody

}

from "../controllers/governingBodyController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();
router.get("/",getGoverningBody);
router.use(authMiddleware)
router.post(
  "/",
  upload.single("photo"),
  saveGoverningBody
);



router.put(
  "/:id",
  upload.single("photo"),
  updateGoverningBody
);

router.delete(
  "/:id",
  deleteGoverningBody
);

export default router;