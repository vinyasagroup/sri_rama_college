import db from "../config/db";

export const saveAQARModel = (
  data: any,
  callback: any
) => {
  db.query(
    `
    INSERT INTO aqar_documents
    (
      aqardoc_year,
      aqardoc_url,
      status
    )
    VALUES (?, ?, ?)
    `,
    [
      data.aqardocYear,
      data.aqardocUrl,
      data.status || "Active",
    ],
    callback
  );
};

export const getAQARModel = (
  callback: any
) => {
  db.query(
    `
    SELECT *
    FROM aqar_documents
    ORDER BY id DESC
    `,
    callback
  );
};

export const updateAQARModel = (
  id: any,
  data: any,
  callback: any
) => {
  db.query(
    `
    UPDATE aqar_documents
    SET
      aqardoc_year = ?,
      aqardoc_url = ?,
      status = ?
    WHERE id = ?
    `,
    [
      data.aqardocYear,
      data.aqardocUrl,
      data.status,
      id,
    ],
    callback
  );
};

export const deleteAQARModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    DELETE FROM aqar_documents
    WHERE id = ?
    `,
    [id],
    callback
  );
};

export const getAQARByIdModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    SELECT *
    FROM aqar_documents
    WHERE id = ?
    `,
    [id],
    (err: any, result: any) => {
      if (err) return callback(err);

      callback(null, result[0]);
    }
  );
};


