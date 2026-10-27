import express from "express";

import upload
from "../middleware/uploadMiddleware";

import {

saveAbout,
updateAbout,
getAbout,
deleteAbout

}

from "../controllers/aboutController";
import authMiddleware from "../middleware/authMiddleware";

const router=
express.Router();

router.get(
"/",
getAbout
);

router.use(authMiddleware)

router.post(
"/save",
upload.single(
"photo"
),
saveAbout
);

router.put(
"/update",
upload.single(
"photo"
),
updateAbout
);

router.delete(
"/delete",  
deleteAbout
);

export default router;