import express from "express";
import multer from "multer";

import {
  saveClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub
} from "../controllers/clubsController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
// ================= Get All Clubs =================

router.get(
  "/",
  getClubs
);

// ================= Get Club By Id =================

router.get(
  "/:id",
  getClubById
);

router.use(authMiddleware)
const upload = multer({
  storage: multer.memoryStorage()
});

// ================= Save Club =================

router.post(
  "/",
  upload.single("clubImage"),
  saveClub
);


// ================= Update Club =================

router.put(
  "/:id",
  upload.single("clubImage"),
  updateClub
);

// ================= Delete Club =================

router.delete(
  "/:id",
  deleteClub
);

export default router;