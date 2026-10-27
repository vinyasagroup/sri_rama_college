import express from "express";

import upload
from "../middleware/uploadMiddleware";

import {

saveDocument,
getDocuments,
updateDocument,
deleteDocument

}

from "../controllers/iqacDocumentController";
import authMiddleware from "../middleware/authMiddleware";

const router =
express.Router();
router.get(
"/",
getDocuments
);

router.use(authMiddleware)
router.post(
"/",
upload.single("file"),
saveDocument
);


router.put(
"/:id",
upload.single("file"),
updateDocument
);

router.delete(
"/:id",
deleteDocument
);

export default router;