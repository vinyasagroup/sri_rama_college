import db from "../config/db";

// =====================================================
// SAVE FACULTY
// =====================================================

export const saveFacultyModel = (
  data: any,
  callback: any
) => {
  db.query(
    `
    INSERT INTO faculty_members
    (
      faculty_photo,
      faculty_quote
    )
    VALUES (?, ?)
    `,
    [
      data.faculty_photo,
      data.faculty_quote,
    ],
    callback
  );
};


// =====================================================
// GET ALL FACULTY
// =====================================================

export const getFacultyModel = (
  callback: any
) => {
  db.query(
    `
    SELECT
      id,
      faculty_photo,
      faculty_quote,
      created_at
    FROM faculty_members
    ORDER BY id DESC
    `,
    callback
  );
};


// =====================================================
// GET FACULTY BY ID
// =====================================================

export const getFacultyByIdModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    SELECT
      id,
      faculty_photo,
      faculty_quote,
      created_at
    FROM faculty_members
    WHERE id = ?
    LIMIT 1
    `,
    [id],
    (err: any, result: any[]) => {
      if (err) {
        return callback(err);
      }

      callback(
        null,
        result[0]
      );
    }
  );
};


// =====================================================
// UPDATE FACULTY
// =====================================================

export const updateFacultyModel = (
  id: any,
  data: any,
  callback: any
) => {
  db.query(
    `
    UPDATE faculty_members
    SET
      faculty_photo = ?,
      faculty_quote = ?
    WHERE id = ?
    `,
    [
      data.faculty_photo,
      data.faculty_quote,
      id,
    ],
    callback
  );
};


// =====================================================
// DELETE FACULTY
// =====================================================

export const deleteFacultyModel = (
  id: any,
  callback: any
) => {
  db.query(
    `
    DELETE FROM faculty_members
    WHERE id = ?
    `,
    [id],
    callback
  );
};