import express from "express";
import multer from "multer";


import {
  saveNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newsController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/",  getNews

);
router.get("/:id", getNewsById);
router.use(authMiddleware)
const storage = multer.memoryStorage();

const upload = multer({

  storage,

});

router.post(

  "/",

  upload.single("bannerImage"),

  saveNews

);


router.put(

  "/:id",

  upload.single("bannerImage"),

  updateNews

);

router.delete(
  "/:id",
  deleteNews

);


export default router;