import {
  saveNIRFModel,
  getNIRFModel,
  getNIRFByIdModel,
  updateNIRFModel,
  deleteNIRFModel,
} from "../models/nirfModel";

import { validateNIRF } from "../schemas/nirfSchema";

import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3";

// SAVE
export const saveNIRF = async (
  req: any,
  res: any
) => {
  try {
    const error = validateNIRF(req.body);

    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Document Required",
      });
    }

    const fileName =
      `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

   saveNIRFModel(
  {
    nirfdocYear: req.body.nirfdocYear,
    nirfdocUrl: fileName,
    status: req.body.status || "Active",
  },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "NIRF Saved",
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

// GET
export const getNIRF = (
  _req: any,
  res: any
) => {
  getNIRFModel((err: any, result: any) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// UPDATE
export const updateNIRF = async (
  req: any,
  res: any
) => {
  try {
    let nirfdocUrl = req.body.oldDocument;

    if (req.file) {
      const fileName =
        `${Date.now()}-${req.file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      // Delete old document from S3
      if (req.body.oldDocument) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: req.body.oldDocument,
          })
        );
      }

      nirfdocUrl = fileName;
    }

    updateNIRFModel(
      req.params.id,
      {
        nirfdocYear: req.body.nirfdocYear,
        nirfdocUrl,
        status: req.body.status || "Active",
      },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "NIRF Updated",
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

// DELETE
export const deleteNIRF = (
  req: any,
  res: any
) => {
  getNIRFByIdModel(
    req.params.id,
    async (err: any, result: any) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result?.nirfdoc_url) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: result.nirfdoc_url,
          })
        );
      }

      deleteNIRFModel(
        req.params.id,
        (err: any) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message: "NIRF Deleted",
          });
        }
      );
    }
  );
};