import express from "express";
import { getFile } from "../controllers/fileController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/*key", getFile);
router.use(authMiddleware)
export default router;