import express from "express";

import upload
from "../middleware/uploadMiddleware";

import {

saveFounderMessage,
getFounderMessages,
updateFounderMessage,
deleteFounderMessage

}

from "../controllers/founderMessageController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();
router.get(
  "/",
  getFounderMessages
);
router.use(authMiddleware)
router.post(
  "/",
  upload.single("photo"),
  saveFounderMessage
);

router.put(
  "/:id",
  upload.single("photo"),
  updateFounderMessage
);

router.delete(
  "/:id",
  deleteFounderMessage
);

export default router;