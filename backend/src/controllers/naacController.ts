import {
  saveNAACModel,
  getNAACModel,
  getNAACByIdModel,
  updateNAACModel,
  deleteNAACModel,
} from "../models/naacModel";

import {
  validateNAAC
} from "../schemas/naacSchema";
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3";

export const saveNAAC = async (
  req:any,
  res:any
) => {

  try{

    const error =
      validateNAAC(req.body);

    if(error){

      return res.status(400).json({
        message:error
      });

    }

    if(!req.file){

      return res.status(400).json({
        message:"Document Required"
      });

    }

    const fileName =
      Date.now() +
      "-" +
      req.file.originalname;

    await s3.send(
      new PutObjectCommand({

        Bucket:process.env.BUCKET_NAME,

        Key:fileName,

        Body:req.file.buffer,

        ContentType:req.file.mimetype,

      })
    );

const naacdocUrl = fileName;

 saveNAACModel(
  {
    naacdocYear: req.body.naacdocYear,
    naacdocUrl,
    status: req.body.status || "Active",
  },

    (err:any)=>{

      if(err){

        return res.status(500).json(err);

      }

      res.json({

        message:"NAAC Saved"

      });

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:"Upload Failed"

    });

  }

};

export const getNAAC = (
  _req:any,
  res:any
) => {

  getNAACModel(

    (err:any,result:any)=>{

      if(err){

        return res.status(500).json(err);

      }

      res.json(result);

    }

  );

};

export const updateNAAC = async (
  req: any,
  res: any
) => {
  try {
    let naacdocUrl = req.body.oldDocument;

    if (req.file) {
      const fileName =
        `${Date.now()}-${req.file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME!,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      // Delete old document from S3
      if (req.body.oldDocument) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: req.body.oldDocument,
          })
        );
      }

      naacdocUrl = fileName;
    }

    updateNAACModel(
      req.params.id,
      {
        naacdocYear: req.body.naacdocYear,
        naacdocUrl,
        status: req.body.status || "Active",
      },
      (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "NAAC Updated",
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


export const deleteNAAC = (
  req: any,
  res: any
) => {

  getNAACByIdModel(
    req.params.id,
    async (err: any, result: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result?.naacdoc_url) {

        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: result.naacdoc_url,
          })
        );

      }

      deleteNAACModel(
        req.params.id,
        (err: any) => {

          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message: "NAAC Deleted",
          });

        }
      );

    }
  );

};