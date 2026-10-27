import {
  saveNewsModel,
  saveParagraphModel,
  getNewsModel,
  getParagraphsModel,
} from "../models/newsModel";

import {
  updateNewsModel,
  deleteParagraphModel,
  deleteNewsModel,
} from "../models/newsModel";
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";
import { validateNews } from "../schemas/newsSchema";

// ======================================
// Save News
// ======================================

export const saveNews = async (
  req: any,
  res: any
) => {
  try {

    const { error } = validateNews(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0]?.message,
      });
    }

    let bannerImage = "";

    if (req.file) {

      const fileName =
        `${Date.now()}-${req.file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );
bannerImage = fileName;
    }

    const newsData = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      date: new Date(req.body.date)
  .toISOString()
  .split("T")[0],
      bannerImage,
    };

    saveNewsModel(
      newsData,
      (
        err: any,
        result: any
      ) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            success: false,
            message:
              "Failed to save news.",
          });

        }

       const newsId = result.insertId;

// Debug logs
console.log("==================================");
console.log("req.body:", req.body);
console.log("req.body.paragraphs:", req.body.paragraphs);
console.log("==================================");

let paragraphs: string[] = [];

try {

  paragraphs = JSON.parse(req.body.paragraphs || "[]");

  console.log("Parsed Paragraphs:", paragraphs);
  console.log("Paragraph Count:", paragraphs.length);

} catch (err) {

  console.log("JSON Parse Error:", err);

  paragraphs = [];

}

        if (
          paragraphs.length === 0
        ) {

          return res.status(201).json({
            success: true,
            message:
              "News saved successfully.",
          });

        }

        let completed = 0;

        paragraphs.forEach(
          (
            para: string,
            index: number
          ) => {

           saveParagraphModel(
  newsId,
  index + 1,
  para,
  (paraErr: any, result: any) => {

    console.log("Paragraph:", para);
    console.log("Error:", paraErr);
    console.log("Result:", result);

    if (paraErr) {
      return res.status(500).json(paraErr);
    }

    completed++;

    if (completed === paragraphs.length) {
      return res.status(201).json({
        success: true,
        message: "News saved successfully.",
      });

                }

              }
            );

          }
        );

      }
    );

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });

  }
};

// ======================================
// Get All News
// ======================================

export const getNews = (
  _req: any,
  res: any
) => {

  getNewsModel(
    (
      err: any,
      news: any[]
    ) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message:
            "Unable to fetch news.",
        });

      }

      if (
        news.length === 0
      ) {

        return res.json([]);

      }

      let completed = 0;

      news.forEach(
        (item: any) => {

          getParagraphsModel(
            item.id,
            (
              paraErr: any,
              paragraphs: any[]
            ) => {

              if (paraErr) {

                item.paragraphs = [];

              } else {

                item.paragraphs =
                  paragraphs.map(
                    (
                      p: any
                    ) =>
                      p.content
                  );

              }

              completed++;

              if (
                completed ===
                news.length
              ) {

                return res.json(
                  news
                );

              }

            }
          );

        }
      );

    }
  );

};

// ======================================
// Get Single News
// ======================================

export const getNewsById = (
  req: any,
  res: any
) => {

  getNewsModel(
    (
      err: any,
      news: any[]
    ) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message:
            "Unable to fetch news.",
        });

      }

      const item =
        news.find(
          (
            n: any
          ) =>
            n.id ==
            req.params.id
        );

      if (!item) {

        return res.status(404).json({
          success: false,
          message:
            "News not found.",
        });

      }

      getParagraphsModel(
        item.id,
        (
          paraErr: any,
          paragraphs: any[]
        ) => {

          if (paraErr) {

            return res.status(500).json({
              success: false,
              message:
                "Unable to fetch paragraphs.",
            });

          }
item.paragraphs =
  paragraphs.map(
    (p: any) =>
      p.content
  );

          return res.json(
            item
          );

        }
      );

    }
  );

};
// ======================================
// Update News
// ======================================



export const updateNews = async (
  req: any,
  res: any
) => {
  try {

    const { error } = validateNews(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0]?.message,
      });
    }

    let bannerImage =
      req.body.oldBanner || "";

    if (req.file) {

      const fileName =
        `${Date.now()}-${req.file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      bannerImage = fileName;
      if (req.body.oldBanner) {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: req.body.oldBanner,
      })
    );
  } catch (err) {
    console.log("Failed to delete old banner:", err);
  }
}
    }

    updateNewsModel(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        date: new Date(req.body.date)
  .toISOString()
  .split("T")[0],
        bannerImage,
      },
      (err: any) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Unable to update news.",
          });

        }

        deleteParagraphModel(
          Number(req.params.id),
          (deleteErr: any) => {

            if (deleteErr) {

              console.log(deleteErr);

            }

            let paragraphs = [];

            try {

              paragraphs = JSON.parse(
                req.body.paragraphs || "[]"
              );

            } catch {

              paragraphs = [];

            }

            if (
              paragraphs.length === 0
            ) {

              return res.json({
                success: true,
                message:
                  "News updated successfully.",
              });

            }

            let completed = 0;

            paragraphs.forEach(
              (
                para: string,
                index: number
              ) => {

                saveParagraphModel(
                  Number(req.params.id),
                  index + 1,
                  para,
                  (paraErr: any) => {

                    if (paraErr) {

                      console.log(
                        paraErr
                      );

                    }

                    completed++;

                    if (
                      completed ===
                      paragraphs.length
                    ) {

                      return res.json({
                        success: true,
                        message:
                          "News updated successfully.",
                      });

                    }

                  }
                );

              }
            );

          }
        );

      }
    );

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });

  }
};

// ======================================
// Delete News
// ======================================

export const deleteNews = (
  req: any,
  res: any
) => {

  deleteNewsModel(
    req.params.id,
    (err: any) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message:
            "Unable to delete news.",
        });

      }

      return res.json({
        success: true,
        message:
          "News deleted successfully.",
      });

    }
  );

};