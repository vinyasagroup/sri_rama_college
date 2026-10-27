import db from "../config/db";

export const saveFounderMessageModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO founder_messages
    (
      name,
      quote,
      message,
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
      data.quote,
      data.message,
      data.photo
    ],
    callback
  );

};

export const getFounderMessagesModel = (
  callback:any
) => {

  db.query(
    "SELECT * FROM founder_messages ORDER BY id DESC",
    callback
  );

};

export const updateFounderMessageModel = (
  id:string,
  data:any,
  callback:any
) => {

  db.query(
    `
    UPDATE founder_messages
    SET
      name=?,
      quote=?,
      message=?,
      photo=?
    WHERE id=?
    `,
    [
      data.name,
      data.quote,
      data.message,
      data.photo,
      id
    ],
    callback
  );

};

export const deleteFounderMessageModel = (
  id:string,
  callback:any
) => {

  db.query(
    "DELETE FROM founder_messages WHERE id=?",
    [id],
    callback
  );

};
export const getFounderMessageByIdModel = (
  id: number,
  callback: Function
) => {
  const sql =
    "SELECT * FROM founder_message WHERE id = ?";

  db.query(sql, [id], (err: any, result: any) => {
    if (err) return callback(err);

    callback(
      null,
      result.length ? result[0] : null
    );
  });
};