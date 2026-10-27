import db from "../config/db";

/* CATEGORY */

export const saveCategoryModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO iqac_categories
    (
      category_name
    )
    VALUES (?)
    `,
    [
      data.categoryName
    ],
    callback
  );

};

export const updateCategoryModel = (
  id:string,
  data:any,
  callback:any
) => {

  db.query(
    `
    UPDATE iqac_categories
    SET
      category_name=?
    WHERE id=?
    `,
    [
      data.categoryName,
      id
    ],
    callback
  );

};

export const deleteCategoryModel = (
  id:string,
  callback:any
) => {

  db.query(
    "DELETE FROM iqac_categories WHERE id=?",
    [id],
    callback
  );

};

export const getCategoriesModel = (
  callback:any
) => {

  db.query(
    "SELECT * FROM iqac_categories ORDER BY id DESC",
    callback
  );

};
