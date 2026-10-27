import db from "../config/db";

export const saveAchievementModel = (
  data:any,
  callback:any
) => {

  db.query(
    `
    INSERT INTO achievements
    (
      achiever_name,
      year,
      description,
      file_name
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
      data.achieverName,
      data.year,
      data.description,
      data.file
    ],
    callback
  );

};

export const getAchievementsModel = (
  callback:any
) => {

  db.query(
    "SELECT * FROM achievements ORDER BY id DESC",
    callback
  );

};

export const updateAchievementModel = (
  id:string,
  data:any,
  callback:any
) => {

  db.query(
    `
    UPDATE achievements
    SET
      achiever_name=?,
      year=?,
      description=?,
      file_name=?
    WHERE id=?
    `,
    [
      data.achieverName,
      data.year,
      data.description,
      data.file,
      id
    ],
    callback
  );

};

export const deleteAchievementModel = (
  id:string,
  callback:any
) => {

  db.query(
    "DELETE FROM achievements WHERE id=?",
    [id],
    callback
  );

};