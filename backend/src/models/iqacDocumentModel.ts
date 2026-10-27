import db from "../config/db";

export const saveDocumentModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
  INSERT INTO iqac_documents
(
  category,
  year,
  file_name,
  status
)
VALUES
(
  ?,
  ?,
  ?,
  ?
)
    `,
[
  data.category,
  data.year,
  data.file,
  data.status
],
    callback
  );

};

export const getDocumentsModel = (
  callback:any
) => {

  db.query(
    "SELECT * FROM iqac_documents ORDER BY id DESC",
    callback
  );

};

export const updateDocumentModel = (
  id: string,
  data: any,
  callback: any
) => {
  db.query(
    `
    UPDATE iqac_documents
    SET
      category=?,
      year=?,
      file_name=?,
      status=?
    WHERE id=?
    `,
    [
      data.category,
      data.year,
      data.file,
      data.status,
      id
    ],
    callback
  );
};

export const deleteDocumentModel = (
  id:string,
  callback:any
) => {

  db.query(
    "DELETE FROM iqac_documents WHERE id=?",
    [id],
    callback
  );

};
export const getDocumentByIdModel = (
  id: number,
  callback: any
) => {
  db.query(
    "SELECT * FROM iqac_documents WHERE id = ?",
    [id],
    callback
  );
};