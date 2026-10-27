import db from "../config/db";

// ================= SAVE =================

export const saveSliderModel = (
  data: any,
  callback: any
) => {

  db.query(
    `
    INSERT INTO homepage_slider
    (
      status,
      slider_image
    )
    VALUES (?, ?)
    `,
    [
      data.status,
      data.sliderImage
    ],
    callback
  );

};

// ================= GET =================

export const getSliderModel = (
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM homepage_slider
    ORDER BY id DESC
    `,
    callback
  );

};

// ================= GET BY ID =================

export const getSliderByIdModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM homepage_slider
    WHERE id=?
    LIMIT 1
    `,
    [id],

    (err: any, result: any) => {

      if (err) {
        return callback(err);
      }

      callback(null, result[0]);

    }

  );

};

// ================= UPDATE =================

export const updateSliderModel = (
  id: any,
  data: any,
  callback: any
) => {

  db.query(
    `
    UPDATE homepage_slider
    SET
      status=?,
      slider_image=?
    WHERE id=?
    `,
    [
      data.status,
      data.sliderImage,
      id
    ],
    callback
  );

};

// ================= DELETE =================

export const deleteSliderModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    DELETE FROM homepage_slider
    WHERE id=?
    `,
    [id],
    callback
  );

};