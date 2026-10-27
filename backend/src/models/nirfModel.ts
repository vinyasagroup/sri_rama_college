import db from "../config/db";

export const saveNIRFModel = (
  data: any,
  callback: any
) => {
  db.query(
    `
    INSERT INTO nirf_documents
    (
      nirfdoc_year,
      nirfdoc_url,
      status
    )
    VALUES (?, ?, ?)
    `,
    [
      data.nirfdocYear,
      data.nirfdocUrl,
      data.status || "Active",
    ],
    callback
  );
};

export const getNIRFModel = (
  callback: any
) => {
  db.query(
    `
    SELECT *
    FROM nirf_documents
    ORDER BY id DESC
    `,
    callback
  );
};

export const updateNIRFModel = (
  id: any,
  data: any,
  callback: any
) => {
  db.query(
    `
    UPDATE nirf_documents
    SET
      nirfdoc_year = ?,
      nirfdoc_url = ?,
      status = ?
    WHERE id = ?
    `,
    [
      data.nirfdocYear,
      data.nirfdocUrl,
      data.status,
      id,
    ],
    callback
  );
};

export const deleteNIRFModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    DELETE FROM nirf_documents
    WHERE id = ?
    `,
    [id],
    callback
  );
};

export const getNIRFByIdModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    SELECT *
    FROM nirf_documents
    WHERE id = ?
    `,
    [id],
    (err: any, result: any) => {
      if (err) return callback(err);

      callback(null, result[0]);
    }
  );
};