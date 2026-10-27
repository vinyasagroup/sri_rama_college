import {
  saveAchievementModel,
  getAchievementsModel,
  updateAchievementModel,
  deleteAchievementModel,
} from "../models/achievementModel";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";

export const saveAchievement = async (
  req: any,
  res: any
) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Document Required",
      });
    }

    const fileName =
      Date.now() + "-" + req.file.originalname;

   await s3.send(
  new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  })
);

    saveAchievementModel(
  {
    achieverName: req.body.achieverName,
    year: req.body.year,
    description: req.body.description,
    file: fileName,
  },
      (err: any) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Achievement Saved",
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

export const getAchievements = (
  _req: any,
  res: any
) => {

  getAchievementsModel(
    (err: any, result: any) => {

      if (err)
        return res.status(500).json(err);

      res.json(result);

    }
  );

};

export const updateAchievement = async (
  req: any,
  res: any
) => {

  try {

    let fileKey = req.body.oldFile;

    if (req.file) {

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

      fileKey = fileName;

    }

   updateAchievementModel(
  req.params.id,
  {
    achieverName: req.body.achieverName,
    year: req.body.year,
    description: req.body.description,
    file: fileKey,
  },
      (err: any) => {

        if (err)
          return res.status(500).json(err);

        res.json({
          message: "Achievement Updated",
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

export const deleteAchievement = (
  req: any,
  res: any
) => {

  deleteAchievementModel(
    req.params.id,
    (err: any) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Deleted",
      });

    }
  );

};