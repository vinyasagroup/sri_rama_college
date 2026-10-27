import db from "../config/db";

export const saveLogoModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO logo_settings
    (
      college_name,
      location,
      logo_url
    )
    VALUES (?,?,?)
    `,
    [
      data.collegeName,
      data.location,
      data.logoUrl
    ],
    callback
  );

};

export const getLogoModel = (
  callback:any
) => {

  db.query(
    `
    SELECT *
    FROM logo_settings
    ORDER BY id DESC
    `,
    callback
  );

};

export const updateLogoModel = (
  id:any,
  data:any,
  callback:any
) => {

  db.query(
    `
    UPDATE logo_settings
    SET
      college_name=?,
      location=?,
      logo_url=?
    WHERE id=?
    `,
    [
      data.collegeName,
      data.location,
      data.logoUrl,
      id
    ],
    callback
  );

};

export const deleteLogoModel = (
  id:any,
  callback:any
) => {

  db.query(
    `
    DELETE FROM logo_settings
    WHERE id=?
    `,
    [id],
    callback
  );

};