import { Request, Response } from "express";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

import { s3 } from "../config/s3";

import {
  getTestimonialsModel,
  getTestimonialByIdModel,
  saveTestimonialModel,
  updateTestimonialModel,
  deleteTestimonialModel,
} from "../models/testimonialsModel";

// ================= Get All =================

export const getTestimonials = (_req: Request, res: Response) => {
  getTestimonialsModel((err: any, result: any) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// ================= Get By Id =================

export const getTestimonialById = (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  getTestimonialByIdModel(id, (err: any, result: any) => {
    if (err) return res.status(500).json(err);

    if (!result) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.json(result);
  });
};

// ================= Save =================

export const saveTestimonial = async (
  req: Request,
  res: Response
) => {
  try {
    let imageKey = "";

    if (req.file) {
      const fileName = `${randomUUID()}-${Date.now()}-${
        req.file.originalname
      }`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );
imageKey = fileName;
      
    }

    const data = {
      testimonial_name: req.body.testimonial_name,
      testimonial_role: req.body.testimonial_role,
      testimonial_description:
        req.body.testimonial_description,
    testimonial_photo: imageKey,
    };

    saveTestimonialModel(data, (err: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Testimonial Saved Successfully",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// ================= Update =================

export const updateTestimonial = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    let imageKey = req.body.oldPhoto || "";

    if (req.file) {
      const fileName = `${randomUUID()}-${Date.now()}-${
        req.file.originalname
      }`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      imageKey = fileName;

      if (req.body.oldPhoto) {
        try {
          const oldKey = req.body.oldPhoto;

          if (oldKey) {
            await s3.send(
              new DeleteObjectCommand({
                Bucket: process.env.BUCKET_NAME!,
                Key: oldKey,
              })
            );
          }
        } catch (e) {
          console.log("Old image delete failed");
        }
      }
    }

    const data = {
      testimonial_name: req.body.testimonial_name,
      testimonial_role: req.body.testimonial_role,
      testimonial_description:
        req.body.testimonial_description,
      testimonial_photo: imageKey,
    };

    updateTestimonialModel(id, data, (err: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Testimonial Updated Successfully",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// ================= Delete =================

export const deleteTestimonial = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    getTestimonialByIdModel(id, async (err: any, result: any) => {
      if (err) return res.status(500).json(err);

      if (!result) {
        return res.status(404).json({
          message: "Testimonial not found",
        });
      }

      if (result.testimonial_photo) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: result.testimonial_photo,
            })
          );
        } catch (error) {
          console.log("Failed to delete S3 image:", error);
        }
      }

      deleteTestimonialModel(id, (err: any) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Testimonial Deleted Successfully",
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};