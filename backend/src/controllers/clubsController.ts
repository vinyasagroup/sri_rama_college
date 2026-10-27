import {
  saveClubModel,
  saveOverviewModel,
  saveCoordinatorModel,
  getClubsModel,
  getClubByIdModel,
  updateClubModel,
  deleteOverviewModel,
  deleteCoordinatorModel,
  deleteClubModel
} from "../models/clubsModel";


import { s3 } from "../config/s3";

import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// ================= Save Club =================

export const saveClub = async (req: any, res: any) => {
  try {
    let clubImage = "";

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

      clubImage = fileName;
    }

    const clubData = {
      clubName: req.body.clubName,
      clubCategory: req.body.clubCategory,
      clubShortDescription: req.body.clubShortDescription,
      clubImage,
    };

    const overview = JSON.parse(req.body.overview || "[]");
    const coordinators = JSON.parse(req.body.coordinators || "[]");

    saveClubModel(clubData, (err: any, clubId: number) => {
      if (err) {
        return res.status(500).json(err);
      }

      saveOverviewModel(clubId, overview, (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        saveCoordinatorModel(clubId, coordinators, (err: any) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.status(201).json({
            success: true,
            message: "Club Saved Successfully",
          });
        });
      });
    });
  } catch (error: any) {
  console.error("Save Club Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
    error,
  });
}
};

// ================= Get Clubs =================
  export const getClubs = (_req: any, res: any) => {

  getClubsModel((err: any, result: any) => {

   if (err) {
  console.error(err);
  return res.status(500).json({
    success: false,
    error: err,
  });
}

    res.json(result);

  });

};

// ================= Get Club By Id =================

export const getClubById = (req: any, res: any) => {
  getClubByIdModel(Number(req.params.id), (err: any, result: any) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log("GET CLUB BY ID RESULT:", JSON.stringify(result, null, 2));
    res.json(result);
  });
};

// ================= Update Club =================

export const updateClub = async (req: any, res: any) => {

  try {

    const id = Number(req.params.id);

    let clubImage = req.body.oldImage || "";

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

  clubImage = fileName;
}
    const clubData = {

      clubName: req.body.clubName,
      clubCategory: req.body.clubCategory,
      clubShortDescription: req.body.clubShortDescription,
      clubImage

    };

    const overview = JSON.parse(req.body.overview || "[]");
    const coordinators = JSON.parse(req.body.coordinators || "[]");

    updateClubModel(id, clubData, (err: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      deleteOverviewModel(id, (err: any) => {

        if (err) {
          return res.status(500).json(err);
        }

        deleteCoordinatorModel(id, (err: any) => {

          if (err) {
            return res.status(500).json(err);
          }

          saveOverviewModel(id, overview, (err: any) => {

            if (err) {
              return res.status(500).json(err);
            }

            saveCoordinatorModel(id, coordinators, (err: any) => {

              if (err) {
                return res.status(500).json(err);
              }

              res.json({
                success: true,
                message: "Club Updated Successfully"
              });

            });

          });

        });

      });

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// ================= Delete Club =================

export const deleteClub = (req: any, res: any) => {
  getClubByIdModel(
    Number(req.params.id),
    async (err: any, result: any) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result?.club?.club_image) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME!,
              Key: result.club.club_image,
            })
          );
        } catch (error) {
          console.log("Failed to delete image:", error);
        }
      }

      deleteClubModel(
        Number(req.params.id),
        (err: any) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            success: true,
            message: "Club Deleted Successfully",
          });
        }
      );
    }
  );
};