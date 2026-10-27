import {
  saveAboutModel,
  getAboutModel,
  updateAboutModel,
  deleteAboutModel,
} from "../models/aboutModel";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";

// SAVE ABOUT
export const saveAbout = async (
  req: any,
  res: any
) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Photo required",
      });
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    saveAboutModel(
      {
        collegeName: req.body.collegeName,
        quote: req.body.quote,
        content: req.body.content,
        vision: req.body.vision,
        mission: req.body.mission,
        photo: fileName, // Store only the object key
      },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Saved",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};

// UPDATE ABOUT
export const updateAbout = async (
  req: any,
  res: any
) => {
  try {
    let photoKey = req.body.oldPhoto;

    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      photoKey = fileName;
    }

    updateAboutModel(
      req.body.id,
      {
        collegeName: req.body.collegeName,
        quote: req.body.quote,
        content: req.body.content,
        vision: req.body.vision,
        mission: req.body.mission,
        photo: photoKey, // Store only the object key
      },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Updated",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Update failed",
    });
  }
};

// GET ABOUT
export const getAbout = (
  _req: any,
  res: any
) => {
  getAboutModel((err: any, result: any) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
};

// DELETE ABOUT
export const deleteAbout = (
  _req: any,
  res: any
) => {
  deleteAboutModel((err: any) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Deleted",
    });
  });
};