import db from "../config/db";

// ================= Save Carousel =================

export const saveCarouselModel = (
  image: string,
  callback: Function
) => {

  const sql = `
    INSERT INTO carousel_images
    (
      carousel_image
    )
    VALUES (?)
  `;

  db.query(
    sql,
    [image],
    (err, result: any) => {

      if (err) {
        return callback(err);
      }

      callback(null, result.insertId);

    }
  );

};

// ================= Get All Carousel Images =================

export const getCarouselModel = (
  callback: Function
) => {

  db.query(
    `
    SELECT *
    FROM carousel_images
    ORDER BY id DESC
    `,
    (err, result) => {

      if (err) {
        return callback(err);
      }

      callback(null, result);

    }
  );

};

// ================= Get Carousel By Id =================

export const getCarouselByIdModel = (
  id: number,
  callback: Function
) => {

  db.query(
    `
    SELECT *
    FROM carousel_images
    WHERE id = ?
    `,
    [id],
    (err, result: any) => {

      if (err) {
        return callback(err);
      }

      callback(null, result[0]);

    }
  );

};

// ================= Update Carousel =================

export const updateCarouselModel = (
  id: number,
  image: string,
  callback: Function
) => {

  const sql = `
    UPDATE carousel_images
    SET
      carousel_image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      image,
      id
    ],
    (err) => {

      if (err) {
        return callback(err);
      }

      callback(null);

    }
  );

};

// ================= Delete Carousel =================

export const deleteCarouselModel = (
  id: number,
  callback: Function
) => {

  db.query(
    `
    DELETE FROM carousel_images
    WHERE id = ?
    `,
    [id],
    (err) => {

      if (err) {
        return callback(err);
      }

      callback(null);

    }
  );

};