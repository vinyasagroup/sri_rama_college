import {
  saveAICTEModel,
  getAICTEModel,
  getAICTEByIdModel,
  updateAICTEModel,
  updateAICTEStatusModel,
  deleteAICTEModel,
} from "../models/aicteModel";

import {
  validateAICTE
} from "../schemas/aicteSchema";
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";

export const saveAICTE = async (
  req: any,
  res: any
) => {

  try {

    const error =
      validateAICTE(req.body);

    if (error) {
      return res.status(400).json({
        message: error
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Document Required"
      });
    }

    const fileName =
      Date.now() +
      "-" +
      req.file.originalname;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        
      })
    );

   const aictedocUrl = fileName;
saveAICTEModel(
  {
    aictedocYear: req.body.aictedocYear,
    aictedocUrl,
    status: req.body.status || "Active",
  },
  (err: any) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "AICTE Document Saved"
    });

  }
);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Upload Failed"
    });

  }

};

export const getAICTE = (
  _req: any,
  res: any
) => {

  getAICTEModel(
    (
      err: any,
      result: any
    ) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

export const updateAICTE = async (
  req: any,
  res: any
) => {
  try {
    let aictedocUrl = req.body.oldDocument;

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

      if (req.body.oldDocument) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: req.body.oldDocument,
          })
        );
      }

      aictedocUrl = fileName;
    }

    updateAICTEModel(
  req.params.id,
  {
    aictedocYear: req.body.aictedocYear,
    aictedocUrl,
    status: req.body.status || "Active",
  },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "AICTE Updated",
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

export const deleteAICTE = (
  req: any,
  res: any
) => {
  getAICTEByIdModel(
    req.params.id,
    async (err: any, result: any) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result?.aictedoc_url) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: result.aictedoc_url,
          })
        );
      }

      deleteAICTEModel(
        req.params.id,
        (err: any) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message: "AICTE Deleted",
          });
        }
      );
    }
  );
};

// ================= UPDATE STATUS =================

export const updateAICTEStatus = (
  req: any,
  res: any
) => {

  const { status } = req.body;

  if (
    status !== "Active" &&
    status !== "Inactive"
  ) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  updateAICTEStatusModel(
    req.params.id,
    status,
    (err: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Status Updated Successfully"
      });

    }
  );
};