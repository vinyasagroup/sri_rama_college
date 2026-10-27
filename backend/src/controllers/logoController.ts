import {
  saveLogoModel,
  getLogoModel,
  updateLogoModel,
  deleteLogoModel
} from "../models/logoModel";
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";

export const saveLogo = async (
  req:any,
  res:any
) => {

  try {

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Logo Required"
      });
    }

    const fileName =
      Date.now() + "-" + file.originalname;

    await s3.send(
  new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  })
);

const logoUrl = fileName;
if (req.body.oldLogo) {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: req.body.oldLogo,
      })
    );
  } catch (error) {
    console.log("Old logo delete failed:", error);
  }
}

    saveLogoModel(
      {
        collegeName: req.body.collegeName,
        location: req.body.location,
        logoUrl
      },

      (err:any) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Logo Saved"
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
export const getLogo = (
  _req:any,
  res:any
) => {

  getLogoModel(
    (
      err:any,
      result:any
    ) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

export const updateLogo = async (
  req:any,
  res:any
) => {

  try {

    let logoUrl =
      req.body.oldLogo;

    if (req.file) {
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

  logoUrl = fileName;

  if (req.body.oldLogo) {
    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: req.body.oldLogo,
        })
      );
    } catch (err) {
      console.log("Old logo delete failed:", err);
    }
  }
}

    updateLogoModel(
      req.params.id,
      {
        collegeName:
          req.body.collegeName,
        location:
          req.body.location,
        logoUrl
      },
      (err:any) => {

        if(err){
          console.log(err);

          return res.status(500).json(err);
        }

        res.json({
          message:"Logo Updated"
        });

      }
    );

  } catch(error){

    console.log(error);

    res.status(500).json({
      message:"Update Failed"
    });

  }

};

export const deleteLogo = (
  req:any,
  res:any
) => {

  deleteLogoModel(
    req.params.id,
    (err:any) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json({
        message:"Logo Deleted"
      });

    }
  );

};