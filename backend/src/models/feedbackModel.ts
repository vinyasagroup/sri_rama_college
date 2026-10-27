import db from "../config/db";

export const saveFeedbackModel = (
  data: any,
  callback: any
) => {

  db.query(
    `
    INSERT INTO feedback
    (
      name,
      email,
      course,
      rating,
      message
    )
    VALUES (?,?,?,?,?)
    `,
    [
      data.name,
      data.email,
      data.course,
      data.rating,
      data.message
    ],
    callback
  );

};

export const getFeedbackModel = (
  callback: any
) => {

  db.query(
    `
    SELECT *
    FROM feedback
    ORDER BY id DESC
    `,
    callback
  );

};

export const deleteFeedbackModel = (
  id: any,
  callback: any
) => {

  db.query(
    `
    DELETE FROM feedback
    WHERE id=?
    `,
    [id],
    callback
  );

};