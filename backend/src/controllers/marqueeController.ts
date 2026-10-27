import {
  saveMarqueeModel,
  getMarqueeModel,
  updateMarqueeModel,
  deleteMarqueeModel
} from "../models/marqueeModel";

import {
  validateMarquee
} from "../schemas/marqueeSchema";

export const saveMarquee = (
  req: any,
  res: any
) => {

  const error =
    validateMarquee(req.body);

  if (error) {
    return res.status(400).json({
      message: error
    });
  }

  saveMarqueeModel(
    req.body,
    (err: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Marquee Saved"
      });

    }
  );

};

export const getMarquee = (
  _req: any,
  res: any
) => {

  getMarqueeModel(
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

export const updateMarquee = (
  req: any,
  res: any
) => {

  updateMarqueeModel(
    req.params.id,
    req.body,
    (err: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Marquee Updated"
      });

    }
  );

};

export const deleteMarquee = (
  req: any,
  res: any
) => {

  deleteMarqueeModel(
    req.params.id,
    (err: any) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Marquee Deleted"
      });

    }
  );

};