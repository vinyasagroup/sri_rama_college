import db from "../config/db";

export const saveAICTEModel = (
  data: any,
  callback: any
) => {

  db.query(
    `
    INSERT INTO aicte_documents
    (
      aictedoc_year,
      aictedoc_url,
      status
    )
    VALUES (?,?,?)
    `,
    [
      data.aictedocYear,
      data.aictedocUrl,
      data.status
    ],
    callback
  );

};

export const getAICTEModel = (
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM aicte_documents
    ORDER BY id DESC
    `,
    callback
  );

};

export const updateAICTEModel = (
  id: any,
  data: any,
  callback: any
) => {

  db.query(
    `
    UPDATE aicte_documents
    SET
      aictedoc_year=?,
      aictedoc_url=?,
      status=?
    WHERE id=?
    `,
    [
      data.aictedocYear,
      data.aictedocUrl,
      data.status,
      id
    ],
    callback
  );

};

export const deleteAICTEModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    DELETE FROM aicte_documents
    WHERE id=?
    `,
    [id],
    callback
  );

};
export const getAICTEByIdModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    SELECT *
    FROM aicte_documents
    WHERE id=?
    `,
    [id],
    (err: any, result: any) => {
      if (err) return callback(err);

      callback(null, result[0]);
    }
  );
};

export const updateAICTEStatusModel = (
  id: any,
  status: string,
  callback: any
) => {

  db.query(
    `UPDATE aicte_documents SET status=? WHERE id=?`,
    [
      status,
      id
    ],
    callback
  );

};