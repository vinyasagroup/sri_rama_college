import {
  saveGoverningBodyModel,
  getGoverningBodyModel,
  getGoverningBodyByIdModel,
  updateGoverningBodyModel,
  deleteGoverningBodyModel,
} from "../models/governingBodyModel";

import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3";

// ================= SAVE MEMBER =================

export const saveGoverningBody = async (
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

    const fileName =
      Date.now() + "-" + file.originalname;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    saveGoverningBodyModel(
      {
        name: req.body.name,
        role: req.body.role,
        content: req.body.content,
        photo: fileName, // Store only the key
      },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Member Saved",
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

// ================= GET MEMBERS =================

export const getGoverningBody = (
  _req: any,
  res: any
) => {
  getGoverningBodyModel(
    (err: any, result: any) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

// ================= UPDATE MEMBER =================

export const updateGoverningBody = async (
  req: any,
  res: any
) => {
  try {
    let photoKey = req.body.oldPhoto || "";

    if (req.file) {
      const fileName =
        Date.now() + "-" + req.file.originalname;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      photoKey = fileName;

      // Delete old image
      if (req.body.oldPhoto) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: req.body.oldPhoto,
            })
          );
        } catch (error) {
          console.log(
            "Old image delete failed:",
            error
          );
        }
      }
    }

    updateGoverningBodyModel(
      req.params.id,
      {
        name: req.body.name,
        role: req.body.role,
        content: req.body.content,
        photo: photoKey,
      },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Member Updated",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Update Failed",
    });
  }
};

// ================= DELETE MEMBER =================

export const deleteGoverningBody = async (
  req: any,
  res: any
) => {
  try {
    const id = req.params.id;

    getGoverningBodyByIdModel(
      id,
      async (err: any, member: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        if (!member) {
          return res.status(404).json({
            message: "Member not found",
          });
        }

        // Delete image from S3
        if (member.photo) {
          try {
            await s3.send(
              new DeleteObjectCommand({
                Bucket: process.env.BUCKET_NAME!,
                Key: member.photo,
              })
            );
          } catch (error) {
            console.log(
              "Failed to delete S3 image:",
              error
            );
          }
        }

        deleteGoverningBodyModel(
          id,
          (err: any) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              message: "Member Deleted",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete Failed",
    });
  }
};