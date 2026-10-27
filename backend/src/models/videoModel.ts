import db from "../config/db";

// ================= SAVE =================

export const saveVideoModel = (
  data: any,
  callback: any
) => {

  db.query(
    `
    INSERT INTO homepage_video
    (
      status,
      video
    )
    VALUES (?, ?)
    `,
    [
      data.status,
      data.video,
    ],
    callback
  );

};

// ================= GET =================

export const getVideosModel = (
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM homepage_video
    ORDER BY id DESC
    `,
    callback
  );

};

// ================= GET BY ID =================

export const getVideoByIdModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM homepage_video
    WHERE id = ?
    LIMIT 1
    `,
    [id],

    (err: any, result: any[]) => {

      if (err) {
        return callback(err);
      }

      callback(
        null,
        result[0]
      );
    }
  );

};

// ================= UPDATE =================

export const updateVideoModel = (
  id: any,
  data: any,
  callback: any
) => {

  db.query(
    `
    UPDATE homepage_video
    SET
      status = ?,
      video = ?
    WHERE id = ?
    `,
    [
      data.status,
      data.video,
      id,
    ],
    callback
  );

};

// ================= DELETE =================

export const deleteVideoModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    DELETE FROM homepage_video
    WHERE id = ?
    `,
    [id],
    callback
  );

};