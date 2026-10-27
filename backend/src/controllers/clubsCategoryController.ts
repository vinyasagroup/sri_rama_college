import {

  saveClubsCategoryModel,
  getClubsCategoryModel,
  updateClubsCategoryModel,
  deleteClubsCategoryModel,

} from "../models/clubsCategoryModel";

import {

  validateClubsCategory,

} from "../schemas/clubsCategorySchema";

// Save

export const saveClubsCategory = (
  req: any,
  res: any
) => {

  const error =
    validateClubsCategory(req.body);

  if (error) {

    return res.status(400).json({
      message: error,
    });

  }

  saveClubsCategoryModel(
    req.body,
    (err: any) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: "Club Category Added Successfully",
      });

    }
  );

};

// Get

export const getClubsCategory = (
  _req: any,
  res: any
) => {

  getClubsCategoryModel(
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

// Update

export const updateClubsCategory = (
  req: any,
  res: any
) => {

  const error =
    validateClubsCategory(req.body);

  if (error) {

    return res.status(400).json({
      message: error,
    });

  }

  updateClubsCategoryModel(
    req.params.id,
    req.body,
    (err: any) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: "Club Category Updated Successfully",
      });

    }
  );

};

// Delete

export const deleteClubsCategory = (
  req: any,
  res: any
) => {

  deleteClubsCategoryModel(
    req.params.id,
    (err: any) => {

      if (err) {

        return res.status(500).json(err);

      }

      res.json({
        message: "Club Category Deleted Successfully",
      });

    }
  );

};