import db from "../config/db";

export const saveClubsCategoryModel = (
  data: any,
  callback: any
) => {

  db.query(
    `
    INSERT INTO clubs_category
    (
      club_category_name
    )
    VALUES
    (?)
    `,
    [
      data.clubCategoryName
    ],
    callback
  );

};

export const getClubsCategoryModel = (
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM clubs_category
    ORDER BY id DESC
    `,
    callback
  );

};

export const updateClubsCategoryModel = (
  id: any,
  data: any,
  callback: any
) => {

  db.query(
    `
    UPDATE clubs_category
    SET
      club_category_name=?
    WHERE id=?
    `,
    [
      data.clubCategoryName,
      id
    ],
    callback
  );

};

export const deleteClubsCategoryModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    DELETE FROM clubs_category
    WHERE id=?
    `,
    [id],
    callback
  );

};