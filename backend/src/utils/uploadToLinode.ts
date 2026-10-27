import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { s3 } from "../config/s3";

export const uploadToLinode = async (
  file: Express.Multer.File
) => {
  const fileName = `${randomUUID()}-${Date.now()}.jpg`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    })
  );

  return `${process.env.S3_ENDPOINT}/${process.env.BUCKET_NAME}/${fileName}`;
};