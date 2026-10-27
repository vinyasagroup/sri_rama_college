import db from "../config/db";

export const saveGoverningBodyModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO governing_body
    (
      name,
      role,
      content,
      photo
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
      data.name,
      data.role,
      data.content,
      data.photo
    ],
    callback
  );

};

export const getGoverningBodyModel = (
  callback:any
) => {

  db.query(
    "SELECT * FROM governing_body ORDER BY id ASC",
    callback
  );

};

export const updateGoverningBodyModel = (
  id:string,
  data:any,
  callback:any
) => {

  db.query(
    `
    UPDATE governing_body
    SET
      name=?,
      role=?,
      content=?,
      photo=?
    WHERE id=?
    `,
    [
      data.name,
      data.role,
      data.content,
      data.photo,
      id
    ],
    callback
  );

};

export const deleteGoverningBodyModel = (
  id:string,
  callback:any
) => {

  db.query(
    "DELETE FROM governing_body WHERE id=?",
    [id],
    callback
  );

};

export const getGoverningBodyByIdModel = (
  id: number,
  callback: Function
) => {
  const sql = `
    SELECT *
    FROM governing_body
    WHERE id = ?
  `;

  db.query(sql, [id], (err: any, result: any) => {
    if (err) return callback(err);

    callback(null, result.length ? result[0] : null);
  });
};