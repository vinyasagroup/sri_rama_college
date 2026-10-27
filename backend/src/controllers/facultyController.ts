import {
  saveFacultyModel,
  getFacultyModel,
  getFacultyByIdModel,
  updateFacultyModel,
  deleteFacultyModel,
} from "../models/facultyModel";

import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { randomUUID } from "crypto";
import { s3 } from "../config/s3";
import { validateFaculty } from "../schemas/facultySchema";
// =====================================================
// SAVE FACULTY
// =====================================================
export const saveFaculty = async (
  req: any,
  res: any
) => {
  try {
    const error =
      validateFaculty(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "Faculty Image Required",
      });
    }
    // Generate unique file name

    const fileName =
      `${randomUUID()}-${Date.now()}-${req.file.originalname}`;
    // =================================================
    // UPLOAD TO LINODE
    // =================================================
    await s3.send(
      new PutObjectCommand({
        Bucket:
          process.env.BUCKET_NAME!,
        Key:fileName,
        Body:req.file.buffer,
        ContentType:req.file.mimetype,
      })
    );
    // =================================================
    // SAVE MYSQL
    // =================================================
    saveFacultyModel(
      {
        faculty_photo:fileName,
        faculty_quote:req.body.faculty_quote,
      },

      (err: any) => {
        if (err) {
          return res.status(500).json({
            message:
              "Database Save Failed",
            error: err,
          });

        }
        res.status(201).json({

          message:"Faculty Saved Successfully",
          faculty_photo:fileName,
          faculty_quote:req.body.faculty_quote,

        });
      }
    );

  }

  catch (error) {
    console.log("Save Faculty Error:",
      error
    );

    res.status(500).json({
      message:"Faculty Upload Failed",

    });

  }

};


// =====================================================
// GET FACULTY
// =====================================================

export const getFaculty = (
  _req: any,
  res: any
) => {

  getFacultyModel(

    (err: any, result: any[]) => {

      if (err) {
        return res.status(500).json({

          message:"Failed to fetch faculty",
          error: err,
        });

      }
      res.json(result);
    }
  );

};
// =====================================================
// UPDATE FACULTY
// =====================================================

export const updateFaculty = async (
  req: any,
  res: any
) => {

  try {

    const id = req.params.id;
    const error =
      validateFaculty(req.body);

    if (error) {

      return res.status(400).json({
        message: error,
      });
    }
    // =================================================
    // GET OLD FACULTY
    // =================================================

    getFacultyByIdModel(
      id,

      async (
        err: any,
        existingFaculty: any
      ) => {

        if (err) {
          return res.status(500).json({
            message:"Failed to find faculty",
            error: err,

          });

        }
        if (!existingFaculty) {

          return res.status(404).json({

            message:
              "Faculty Not Found",

          });

        }


        // Keep old image

        let facultyPhoto =
          existingFaculty.faculty_photo;


        // =================================================
        // NEW IMAGE
        // =================================================

        if (req.file) {

          const newFileName =
            `${randomUUID()}-${Date.now()}-${req.file.originalname}`;


          // Upload new image

          await s3.send(
            new PutObjectCommand({

              Bucket:
                process.env.BUCKET_NAME!,

              Key:
                newFileName,

              Body:
                req.file.buffer,

              ContentType:
                req.file.mimetype,

            })
          );


          facultyPhoto =
            newFileName;


          // =================================================
          // DELETE OLD IMAGE
          // =================================================

          if (
            existingFaculty.faculty_photo
          ) {

            try {

              await s3.send(
                new DeleteObjectCommand({

                  Bucket:
                    process.env.BUCKET_NAME!,

                  Key:
                    existingFaculty.faculty_photo,

                })
              );

            }

            catch (deleteError) {

              console.log(
                "Old faculty image delete failed:",
                deleteError
              );

            }

          }

        }


        // =================================================
        // UPDATE MYSQL
        // =================================================

        updateFacultyModel(

          id,

          {

            faculty_photo:
              facultyPhoto,

            faculty_quote:
              req.body.faculty_quote,

          },

          (updateError: any) => {

            if (updateError) {

              return res.status(500).json({

                message:
                  "Faculty Update Failed",

                error:
                  updateError,

              });

            }


            res.json({

              message:
                "Faculty Updated Successfully",

              faculty_photo:
                facultyPhoto,

              faculty_quote:
                req.body.faculty_quote,

            });

          }
        );

      }
    );

  }

  catch (error) {

    console.log(
      "Update Faculty Error:",
      error
    );

    res.status(500).json({

      message:
        "Faculty Update Failed",

    });

  }

};


// =====================================================
// DELETE FACULTY
// =====================================================

export const deleteFaculty = (
  req: any,
  res: any
) => {

  getFacultyByIdModel(

    req.params.id,

    async (
      err: any,
      faculty: any
    ) => {

      if (err) {

        return res.status(500).json({

          message:
            "Failed to find faculty",

          error: err,

        });

      }


      if (!faculty) {

        return res.status(404).json({

          message:
            "Faculty Not Found",

        });

      }


      // =================================================
      // DELETE LINODE IMAGE
      // =================================================

      if (faculty.faculty_photo) {

        try {

          await s3.send(

            new DeleteObjectCommand({

              Bucket:
                process.env.BUCKET_NAME!,

              Key:
                faculty.faculty_photo,

            })

          );

        }

        catch (deleteError) {

          console.log(
            "Linode image delete failed:",
            deleteError
          );

        }

      }


      // =================================================
      // DELETE MYSQL
      // =================================================

      deleteFacultyModel(

        req.params.id,

        (deleteError: any) => {

          if (deleteError) {

            return res.status(500).json({

              message:
                "Faculty Delete Failed",

              error:
                deleteError,

            });

          }


          res.json({

            message:
              "Faculty Deleted Successfully",

          });

        }

      );

    }

  );

};