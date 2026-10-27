import {

  saveNewsCategoryModel,
  getNewsCategoryModel,
  updateNewsCategoryModel,
  deleteNewsCategoryModel

} from "../models/newsCategoryModel";

import {

  validateNewsCategory

} from "../schemas/newsCategorySchema";

export const saveNewsCategory = (
  req: any,
  res: any
) => {

  const error =
    validateNewsCategory(req.body);

  if (error) {

    return res.status(400).json({
      message: error
    });

  }

  saveNewsCategoryModel(
    req.body,
    (err: any) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: "News Category Added"
      });

    }
  );

};

export const getNewsCategory = (
  _req: any,
  res: any
) => {

  getNewsCategoryModel(
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

export const updateNewsCategory = (
  req: any,
  res: any
) => {

  const error =
    validateNewsCategory(req.body);

  if (error) {

    return res.status(400).json({
      message: error
    });

  }

  updateNewsCategoryModel(

    req.params.id,

    req.body,

    (err: any) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: "News Category Updated"
      });

    }

  );

};

export const deleteNewsCategory = (
  req: any,
  res: any
) => {

  deleteNewsCategoryModel(

    req.params.id,

    (err: any) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: "News Category Deleted"
      });

    }

  );

};