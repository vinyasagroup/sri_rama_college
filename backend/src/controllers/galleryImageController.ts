import {
  saveGalleryImageModel,
  getGalleryImageModel,
  getGalleryImageByIdModel,
  updateGalleryImageModel,
  deleteGalleryImageModel
} from "../models/galleryImageModel";

import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import {
  validateGalleryImage
} from "../schemas/galleryImageSchema";


import { s3 } from "../config/s3";

// SAVE
export const saveGalleryImage = async (
  req:any,
  res:any
) => {

 
try {

  const error = validateGalleryImage(req.body);

  if (error) {
    return res.status(400).json({
      message: error,
    });
  }
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Image Required"
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

  const imageKey = fileName;
    saveGalleryImageModel(
      {
        title: req.body.title,
        galleryCategoryName:
          req.body.galleryCategoryName,
        imageUrl: imageKey,
        description:
          req.body.description
      },

      (err:any) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Gallery Image Added"
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

// GET
export const getGalleryImage = (
  _req: any,
  res: any
) => {
  getGalleryImageModel(
    (err: any, result: any[]) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

// UPDATE
export const updateGalleryImage = async (
  req:any,
  res:any
) => {

  try {
let imageKey = req.body.oldImage;

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
          ContentType:
            req.file.mimetype,
         
        })
      );

    imageKey = fileName;
    if (req.body.oldImage) {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: req.body.oldImage,
      })
    );
  } catch (error) {
    console.log("Old image delete failed:", error);
  }
}
    }

   updateGalleryImageModel(
  req.params.id,
  {
    title: req.body.title,
    galleryCategoryName: req.body.galleryCategoryName,
    imageUrl: imageKey,
    description: req.body.description,
  },
  (err: any) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Gallery Image Updated",
    });
  }
);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Update Failed"
    });

  }

};

// DELETE
export const deleteGalleryImage = (
  req: any,
  res: any
) => {
  getGalleryImageByIdModel(
    req.params.id,
    async (err: any, image: any) => {
      if (err)
        return res.status(500).json(err);

      if (!image) {
        return res.status(404).json({
          message: "Image not found",
        });
      }

      if (image.image_url) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: image.image_url,
            })
          );
        } catch (error) {
          console.log("Failed to delete image:", error);
        }
      }

      deleteGalleryImageModel(
        req.params.id,
        (err: any) => {
          if (err)
            return res.status(500).json(err);

          res.json({
            message: "Gallery Image Deleted",
          });
        }
      );
    }
  );
};