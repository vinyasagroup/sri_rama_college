import {

saveCategoryModel,
getCategoriesModel,
updateCategoryModel,
deleteCategoryModel,


}

from "../models/iqacModel";

/* CATEGORY */

export const saveCategory =
(
req:any,
res:any
)=>{

saveCategoryModel(

req.body,

(err:any)=>{

if(err)
return res.status(500).json(err);

res.json({
message:"Category Saved"
});

}

);

};

export const getCategories =
(
_req:any,
res:any
)=>{

getCategoriesModel(

(
err:any,
result:any
)=>{

if(err)
return res.status(500).json(err);

res.json(result);

}

);

};


export const updateCategory = (
  req:any,
  res:any
) => {

  updateCategoryModel(
    req.params.id,
    req.body,

    (err:any) => {

      if(err)
        return res
          .status(500)
          .json(err);

      res.json({
        message:"Category Updated"
      });

    }
  );

};

export const deleteCategory = (
  req:any,
  res:any
) => {

  deleteCategoryModel(
    req.params.id,

    (err:any) => {

      if(err)
        return res
          .status(500)
          .json(err);

      res.json({
        message:"Category Deleted"
      });

    }
  );

};
