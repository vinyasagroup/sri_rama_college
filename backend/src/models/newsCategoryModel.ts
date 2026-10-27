import db from "../config/db";

export const saveNewsCategoryModel = (
  data: any,
  callback: any
) => {

  db.query(
    `
    INSERT INTO news_category
    (
      news_category_name
    )
    VALUES (?)
    `,
    [
      data.newsCategoryName
    ],
    callback
  );

};

export const getNewsCategoryModel = (
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM news_category
    ORDER BY id DESC
    `,
    callback
  );

};

export const updateNewsCategoryModel = (
  id: any,
  data: any,
  callback: any
) => {

  db.query(
    `
    UPDATE news_category
    SET
      news_category_name=?
    WHERE id=?
    `,
    [
      data.newsCategoryName,
      id
    ],
    callback
  );

};

export const deleteNewsCategoryModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    DELETE FROM news_category
    WHERE id=?
    `,
    [id],
    callback
  );

};