import db from "../config/db";

export const saveGalleryImageModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO gallery_images
    (
      title,
      gallery_category_name,
      image_url,
      description
    )
    VALUES (?,?,?,?)
    `,
    [
      data.title,
      data.galleryCategoryName,
      data.imageUrl,
      data.description
    ],
    callback
  );

};

export const getGalleryImageModel = (
  callback:any
) => {

  db.query(
    `
    SELECT *
    FROM gallery_images
    ORDER BY id ASC
    `,
    callback
  );

};

export const updateGalleryImageModel = (
  id:any,
  data:any,
  callback:any
) => {

  db.query(
    `
    UPDATE gallery_images
    SET
      title=?,
      gallery_category_name=?,
      image_url=?,
      description=?
    WHERE id=?
    `,
    [
      data.title,
      data.galleryCategoryName,
      data.imageUrl,
      data.description,
      id
    ],
    callback
  );

};

export const deleteGalleryImageModel = (
  id:any,
  callback:any
) => {

  db.query(
    `
    DELETE FROM gallery_images
    WHERE id=?
    `,
    [id],
    callback
  );

};

export const getGalleryImageByIdModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    SELECT *
    FROM gallery_images
    WHERE id = ?
    `,
    [id],
    (err: any, result: any) => {
      if (err) return callback(err);

      callback(
        null,
        result.length ? result[0] : null
      );
    }
  );
};