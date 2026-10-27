import db from "../config/db";

export const loginModel = (
  username: string,
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM admin_users
    WHERE username = ?
    LIMIT 1
    `,
    [username],
    callback
  );

};