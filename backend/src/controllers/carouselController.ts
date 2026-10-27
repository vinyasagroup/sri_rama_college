import {
  saveCarouselModel,
  getCarouselModel,
  getCarouselByIdModel,
  updateCarouselModel,
  deleteCarouselModel,
} from "../models/carouselModel";

import { s3 } from "../config/s3";
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// ================= Save Carousel =================

export const saveCarousel = async (
  req: any,
  res: any
) => {
  try {

    let carouselImage = "";

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

      carouselImage = `${fileName}`;

    }

    saveCarouselModel(
      carouselImage,
      (err: any) => {

        if (err) {
          console.error(err);

          return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
          });
        }

        res.status(201).json({
          success: true,
          message: "Carousel Image Saved Successfully",
        });

      }
    );

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get Carousel =================

export const getCarousel = (
  _req: any,
  res: any
) => {

  getCarouselModel(
    (err: any, result: any) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          success: false,
          message: err.sqlMessage || err.message,
        });

      }

      res.json(result);

    }
  );

};

// ================= Get Carousel By Id =================

export const getCarouselById = (
  req: any,
  res: any
) => {

  getCarouselByIdModel(
    Number(req.params.id),
    (err: any, result: any) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          success: false,
          message: err.sqlMessage || err.message,
        });

      }

      res.json(result);

    }
  );

};

// ================= Update Carousel =================

export const updateCarousel = async (
  req: any,
  res: any
) => {
  try {
    const id = Number(req.params.id);

    let carouselImage = req.body.oldImage || "";

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

      carouselImage = fileName;

      if (req.body.oldImage) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: req.body.oldImage,
            })
          );
        } catch (err) {
          console.log("Old image delete failed:", err);
        }
      }
    }

    updateCarouselModel(
      id,
      carouselImage,
      (err: any) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
          });
        }

        res.json({
          success: true,
          message: "Carousel Updated Successfully",
        });
      }
    );
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Delete Carousel =================
export const deleteCarousel = (
  req: any,
  res: any
) => {
  getCarouselByIdModel(
    Number(req.params.id),
    async (err: any, image: any) => {

      if (err)
        return res.status(500).json(err);

      if (!image)
        return res.status(404).json({
          message: "Image not found",
        });

      if (image.carousel_image) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: image.carousel_image,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }

      deleteCarouselModel(
        Number(req.params.id),
        (err: any) => {
          if (err)
            return res.status(500).json(err);

          res.json({
            success: true,
            message: "Carousel Deleted Successfully",
          });
        }
      );
    }
  );
};