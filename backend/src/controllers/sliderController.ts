import {
  saveSliderModel,
  getSliderModel,
  getSliderByIdModel,
  updateSliderModel,
  deleteSliderModel,
} from "../models/sliderModel";

import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3";

import {
  validateSlider,
} from "../schemas/sliderSchema";

// ================= SAVE =================

export const saveSlider = async (
  req: any,
  res: any
) => {

  try {

    const error =
      validateSlider(req.body);

    if (error) {

      return res.status(400).json({
        message: error,
      });

    }

    if (!req.file) {

      return res.status(400).json({
        message: "Slider Image Required",
      });

    }

    const fileName =
      Date.now() +
      "-" +
      req.file.originalname;

    await s3.send(

      new PutObjectCommand({

        Bucket: process.env.BUCKET_NAME!,

        Key: fileName,

        Body: req.file.buffer,

        ContentType: req.file.mimetype,

      })

    );

    saveSliderModel(

      {

        status: req.body.status,

        sliderImage: fileName,

      },

      (err: any) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Slider Saved Successfully",

        });

      }

    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Upload Failed",

    });

  }

};

// ================= GET =================

export const getSlider = (
  _req: any,
  res: any
) => {

  getSliderModel(

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

// ================= UPDATE =================

export const updateSlider = async (
  req: any,
  res: any
) => {

  try {

    let sliderImage =
      req.body.oldImage;

    if (req.file) {

      const fileName =
        Date.now() +
        "-" +
        req.file.originalname;

      await s3.send(

        new PutObjectCommand({

          Bucket: process.env.BUCKET_NAME!,

          Key: fileName,

          Body: req.file.buffer,

          ContentType:
            req.file.mimetype,

        })

      );

      sliderImage = fileName;

      // Delete Old Image

      if (req.body.oldImage) {

        try {

          await s3.send(

            new DeleteObjectCommand({

              Bucket:
                process.env.BUCKET_NAME!,

              Key:
                req.body.oldImage,

            })

          );

        } catch (error) {

          console.log(
            "Old Image Delete Failed",
            error
          );

        }

      }

    }

    updateSliderModel(

      req.params.id,

      {

        status:
          req.body.status,

        sliderImage,

      },

      (err: any) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Slider Updated Successfully",

        });

      }

    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Update Failed",

    });

  }

};

// ================= DELETE =================

export const deleteSlider = (
  req: any,
  res: any
) => {

  getSliderByIdModel(

    req.params.id,

    async (
      err: any,
      slider: any
    ) => {

      if (err) {

        return res.status(500).json(err);

      }

      if (!slider) {

        return res.status(404).json({

          message:
            "Slider Not Found",

        });

      }

      if (slider.slider_image) {

        try {

          await s3.send(

            new DeleteObjectCommand({

              Bucket:
                process.env.BUCKET_NAME!,

              Key:
                slider.slider_image,

            })

          );

        } catch (error) {

          console.log(
            "Delete Image Failed",
            error
          );

        }

      }

      deleteSliderModel(

        req.params.id,

        (err: any) => {

          if (err) {

            return res.status(500).json(err);

          }

          res.json({

            message:
              "Slider Deleted Successfully",

          });

        }

      );

    }

  );

};