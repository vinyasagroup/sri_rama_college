import db from "../config/db";

export const saveGalleryCategoryModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO gallery_category
    (
      gallery_category_name
    )
    VALUES
    (
      ?
    )
    `,
    [
      data.categoryName
    ],
    callback
  );

};

export const getGalleryCategoryModel = (
  callback:any
) => {

  db.query(
    `
    SELECT *
    FROM gallery_category
    ORDER BY id DESC
    `,
    callback
  );

};

export const updateGalleryCategoryModel = (
  id:string,
  data:any,
  callback:any
) => {

  db.query(
    `
    UPDATE gallery_category
    SET gallery_category_name=?
    WHERE id=?
    `,
    [
      data.categoryName,
      id
    ],
    callback
  );

};

export const deleteGalleryCategoryModel = (
  id:string,
  callback:any
) => {

  db.query(
    `
    DELETE FROM gallery_category
    WHERE id=?
    `,
    [id],
    callback
  );

};