import {
  saveAQARModel,
  getAQARModel,
  getAQARByIdModel,
  updateAQARModel,
  deleteAQARModel,
} from "../models/aqarModel";

import { validateAQAR } from "../schemas/aqarSchema";

import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";

export const saveAQAR = async (
  req: any,
  res: any
) => {

  try {

    const error =
      validateAQAR(req.body);

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

  const aqardocUrl = fileName;
    saveAQARModel(
  {
    aqardocYear: req.body.aqardocYear,
    aqardocUrl,
    status: req.body.status || "Active",
  },
  (err: any) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "AQAR Saved",
    });
  }
);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Upload Failed",
    });

  }

};

export const getAQAR = (
  _req: any,
  res: any
) => {

  getAQARModel(
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

export const updateAQAR = async (
  req: any,
  res: any
) => {
  try {
    let aqardocUrl = req.body.oldDocument;

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

      aqardocUrl = fileName;
    }

    updateAQARModel(
      req.params.id,
      {
        aqardocYear: req.body.aqardocYear,
        aqardocUrl,
        status: req.body.status || "Active",
      },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "AQAR Updated",
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


export const deleteAQAR = (
  req: any,
  res: any
) => {

  getAQARByIdModel(
    req.params.id,
    async (err: any, result: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result?.aqardoc_url) {

        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: result.aqardoc_url,
          })
        );

      }

      deleteAQARModel(
        req.params.id,
        (err: any) => {

          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message: "AQAR Deleted",
          });

        }
      );

    }
  );

};