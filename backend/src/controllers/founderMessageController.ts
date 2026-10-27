import {
  saveFounderMessageModel,
  getFounderMessagesModel,
  getFounderMessageByIdModel,
  updateFounderMessageModel,
  deleteFounderMessageModel
} from "../models/founderMessageModel";
import {PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";

export const saveFounderMessage = async (
  req:any,
  res:any
) => {

  try {

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Photo required"
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

    saveFounderMessageModel(

      {
        name: req.body.name,
        quote: req.body.quote,
        message: req.body.message,
        photo: imageKey
      },

      (err:any) => {

        if(err)
          return res.status(500).json(err);

        res.json({
          message:"Founder Saved"
        });

      }

    );

  } catch(error) {

    console.log(error);

    res.status(500).json({
      message: "Upload Failed"
    });

  }

};
export const getFounderMessages = (
  _req:any,
  res:any
) => {

  getFounderMessagesModel(

    (err:any,result:any) => {
      if(err)
        return res.status(500).json(err);
      res.json(result);
    }
  );
};
export const updateFounderMessage = async (
  req:any,
  res:any
) => {

  try {

    let photoKey = req.body.oldPhoto;

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

     photoKey = fileName;
     if (req.body.oldPhoto) {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: req.body.oldPhoto,
      })
    );
  } catch (error) {
    console.log("Old image delete failed:", error);
  }
}
    }

    updateFounderMessageModel(

      req.params.id,

      {
        name: req.body.name,
        quote: req.body.quote,
        message: req.body.message,
        photo: photoKey
      },

      (err:any) => {

        if (err)
          return res.status(500).json(err);

        res.json({
          message: "Founder Updated"
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
export const deleteFounderMessage = (
  req: any,
  res: any
) => {
  getFounderMessageByIdModel(
    req.params.id,
    async (err: any, founder: any) => {
      if (err)
        return res.status(500).json(err);

      if (!founder) {
        return res.status(404).json({
          message: "Founder not found",
        });
      }

      if (founder.photo) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: founder.photo,
            })
          );
        } catch (error) {
          console.log(
            "Failed to delete image:",
            error
          );
        }
      }

      deleteFounderMessageModel(
        req.params.id,
        (err: any) => {
          if (err)
            return res.status(500).json(err);

          res.json({
            message: "Founder Deleted",
          });
        }
      );
    }
  );
};