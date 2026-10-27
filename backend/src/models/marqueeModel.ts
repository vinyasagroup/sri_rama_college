import db from "../config/db";

export const saveMarqueeModel = (
  data: any,
  callback: any
) => {

  db.query(
    `
    INSERT INTO marquee_settings
    (
      marquee_text
    )
    VALUES (?)
    `,
    [
      data.marqueeText
    ],
    callback
  );

};

export const getMarqueeModel = (
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM marquee_settings
    ORDER BY id DESC
    `,
    callback
  );

};

export const updateMarqueeModel = (
  id: any,
  data: any,
  callback: any
) => {

  db.query(
    `
    UPDATE marquee_settings
    SET marquee_text=?
    WHERE id=?
    `,
    [
      data.marqueeText,
      id
    ],
    callback
  );

};

export const deleteMarqueeModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    DELETE FROM marquee_settings
    WHERE id=?
    `,
    [id],
    callback
  );

};