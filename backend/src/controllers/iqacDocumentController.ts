import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3";

import {
  saveDocumentModel,
  getDocumentsModel,
  getDocumentByIdModel,
  updateDocumentModel,
  deleteDocumentModel,
} from "../models/iqacDocumentModel";

// ================= SAVE DOCUMENT =================

export const saveDocument = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

   saveDocumentModel(
  {
    category: req.body.category,
    year: req.body.year,
    file: fileName,
    status: req.body.status || "Active",
  },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Document Saved Successfully",
        });
      }
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Upload Failed",
    });
  }
};

// ================= GET DOCUMENTS =================

export const getDocuments = (_req: any, res: any) => {
  getDocumentsModel((err: any, result: any) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// ================= UPDATE DOCUMENT =================

export const updateDocument = async (req: any, res: any) => {
  try {
    let fileName = req.body.oldFile;

    if (req.file) {
      fileName = `${Date.now()}-${req.file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      if (req.body.oldFile) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: req.body.oldFile,
            })
          );
        } catch (err) {
          console.log("Old file delete failed:", err);
        }
      }
    }

 updateDocumentModel(
  req.params.id,
  {
    category: req.body.category,
    year: req.body.year,
    file: fileName,
    status: req.body.status || "Active",
  },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Updated Successfully",
        });
      }
    );
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Update Failed",
    });
  }
};

// ================= DELETE DOCUMENT =================

export const deleteDocument = async (req: any, res: any) => {
  try {
    getDocumentByIdModel(req.params.id, async (err: any, result: any) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result?.file_name) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: result.file_name,
            })
          );
        } catch (err) {
          console.log("S3 delete failed:", err);
        }
      }

      deleteDocumentModel(req.params.id, (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Deleted Successfully",
        });
      });
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Delete Failed",
    });
  }
};