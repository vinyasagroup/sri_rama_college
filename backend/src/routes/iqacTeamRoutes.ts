import express from "express";

import {

saveTeam,
getTeam,
updateTeam,
deleteTeam

}

from "../controllers/iqacTeamController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();

router.get(
"/",
getTeam
);
router.use(authMiddleware)
router.post(
"/",
saveTeam
);


router.put(
"/:id",
updateTeam
);

router.delete(
"/:id",
deleteTeam
);

export default router;