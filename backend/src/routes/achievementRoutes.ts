import express from "express";

import upload
from "../middleware/uploadMiddleware";

import {

saveAchievement,
getAchievements,
updateAchievement,
deleteAchievement

}

from "../controllers/achievementController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();

router.get(
"/",
getAchievements
);
router.use(authMiddleware)

router.post(
"/",
upload.single("file"),
saveAchievement
);



router.put(
"/:id",
upload.single("file"),
updateAchievement
);

router.delete(
"/:id",
deleteAchievement
);

export default router;