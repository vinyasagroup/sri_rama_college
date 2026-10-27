import {
  saveVideoModel,
  getVideosModel,
  getVideoByIdModel,
  updateVideoModel,
  deleteVideoModel,
} from "../models/videoModel";

import { validateVideo } from "../schemas/videoSchema";

// ================= SAVE YOUTUBE VIDEO =================

export const saveVideo = (
  req: any,
  res: any
) => {
  try {
    const error = validateVideo(req.body);

    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    saveVideoModel(
      {
        status: req.body.status,
        video: req.body.video,
      },
      (err: any) => {
        if (err) {
          return res.status(500).json({
            message: "Database Save Failed",
            error: err,
          });
        }

        res.status(201).json({
          message: "YouTube Video Saved Successfully",
        });
      }
    );

  } catch (error) {
    console.error("Save YouTube Video Error:", error);

    res.status(500).json({
      message: "Save Failed",
    });
  }
};

// ================= GET VIDEOS =================

export const getVideos = (
  _req: any,
  res: any
) => {

  getVideosModel(
    (err: any, result: any) => {

      if (err) {
        return res.status(500).json({
          message: "Failed to fetch videos",
          error: err,
        });
      }

      res.json(result);
    }
  );
};

// ================= UPDATE VIDEO =================

export const updateVideo = (
  req: any,
  res: any
) => {

  try {

    const error = validateVideo(req.body);

    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    updateVideoModel(
      req.params.id,
      {
        status: req.body.status,
        video: req.body.video,
      },
      (err: any) => {

        if (err) {
          return res.status(500).json({
            message: "Video Update Failed",
            error: err,
          });
        }

        res.json({
          message: "YouTube Video Updated Successfully",
        });
      }
    );

  } catch (error) {

    console.error(
      "Update YouTube Video Error:",
      error
    );

    res.status(500).json({
      message: "Update Failed",
    });
  }
};

// ================= DELETE VIDEO =================

export const deleteVideo = (
  req: any,
  res: any
) => {

  getVideoByIdModel(
    req.params.id,

    (err: any, videoData: any) => {

      if (err) {
        return res.status(500).json({
          message: "Failed to find video",
          error: err,
        });
      }

      if (!videoData) {
        return res.status(404).json({
          message: "Video Not Found",
        });
      }

      deleteVideoModel(
        req.params.id,

        (deleteError: any) => {

          if (deleteError) {
            return res.status(500).json({
              message: "Video Delete Failed",
              error: deleteError,
            });
          }

          res.json({
            message: "YouTube Video Deleted Successfully",
          });
        }
      );
    }
  );
};