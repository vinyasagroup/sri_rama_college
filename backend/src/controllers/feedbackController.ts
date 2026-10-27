import {
  saveFeedbackModel,
  getFeedbackModel,
  deleteFeedbackModel
} from "../models/feedbackModel";

import {
  validateFeedback
} from "../schemas/feedbackSchema";

export const saveFeedback = (
  req: any,
  res: any
) => {

  const error =
    validateFeedback(
      req.body
    );

  if (error) {
    return res.status(400).json({
      message: error
    });
  }

  saveFeedbackModel(
    req.body,
    (err: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message:
          "Feedback Submitted Successfully"
      });

    }
  );

};

export const getFeedback = (
  _req: any,
  res: any
) => {

  getFeedbackModel(
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

export const deleteFeedback = (
  req: any,
  res: any
) => {

  deleteFeedbackModel(
    req.params.id,
    (err: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message:
          "Feedback Deleted"
      });

    }
  );

};