import {
  saveGalleryCategoryModel,
  getGalleryCategoryModel,
  updateGalleryCategoryModel,
  deleteGalleryCategoryModel
} from "../models/galleryCategoryModel";

import {
  validateGalleryCategory
} from "../schemas/galleryCategorySchema";

export const saveGalleryCategory = (
  req:any,
  res:any
) => {

  const error =
    validateGalleryCategory(
      req.body
    );

  if(error){
    return res.status(400).json({
      message:error
    });
  }

  saveGalleryCategoryModel(
    req.body,
    (err:any) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json({
        message:"Gallery Category Saved"
      });

    }
  );

};

export const getGalleryCategory = (
  _req:any,
  res:any
) => {

  getGalleryCategoryModel(
    (
      err:any,
      result:any
    ) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

export const updateGalleryCategory = (
  req:any,
  res:any
) => {

  updateGalleryCategoryModel(
    req.params.id,
    req.body,
    (err:any) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json({
        message:"Gallery Category Updated"
      });

    }
  );

};

export const deleteGalleryCategory = (
  req:any,
  res:any
) => {

  deleteGalleryCategoryModel(
    req.params.id,
    (err:any) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json({
        message:"Gallery Category Deleted"
      });

    }
  );

};