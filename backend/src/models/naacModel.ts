import db from "../config/db";

export const saveNAACModel = (
  data: any,
  callback: any
) => {
  db.query(
    `
    INSERT INTO naac_documents
    (
      naacdoc_year,
      naacdoc_url,
      status
    )
    VALUES (?, ?, ?)
    `,
    [
      data.naacdocYear,
      data.naacdocUrl,
      data.status || "Active",
    ],
    callback
  );
};

export const getNAACModel = (
  callback: any
) => {
  db.query(
    `
    SELECT *
    FROM naac_documents
    ORDER BY id DESC
    `,
    callback
  );
};

export const updateNAACModel = (
  id: any,
  data: any,
  callback: any
) => {
  db.query(
    `
    UPDATE naac_documents
    SET
      naacdoc_year = ?,
      naacdoc_url = ?,
      status = ?
    WHERE id = ?
    `,
    [
      data.naacdocYear,
      data.naacdocUrl,
      data.status,
      id,
    ],
    callback
  );
};

export const deleteNAACModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    DELETE FROM naac_documents
    WHERE id = ?
    `,
    [id],
    callback
  );
};

export const getNAACByIdModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    SELECT *
    FROM naac_documents
    WHERE id = ?
    `,
    [id],
    (err: any, result: any) => {
      if (err) return callback(err);

      callback(null, result[0]);
    }
  );
};