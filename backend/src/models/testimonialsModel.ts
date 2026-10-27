import db from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// ================= Get All Testimonials =================

export const getTestimonialsModel = (callback: Function) => {
  const sql = `
    SELECT *
    FROM testimonials
    ORDER BY id ASC
  `;

  db.query(sql, (err: any, results: RowDataPacket[]) => {
    if (err) {
      return callback(err);
    }

    callback(null, results);
  });
};

// ================= Get Testimonial By Id =================

export const getTestimonialByIdModel = (
  id: number,
  callback: Function
) => {
  const sql = `
    SELECT *
    FROM testimonials
    WHERE id = ?
  `;

  db.query(sql, [id], (err: any, results: RowDataPacket[]) => {
    if (err) {
      return callback(err);
    }

    callback(null, results.length ? results[0] : null);
  });
};

// ================= Save Testimonial =================

export const saveTestimonialModel = (
  data: any,
  callback: Function
) => {
  const sql = `
    INSERT INTO testimonials
    (
      testimonial_name,
      testimonial_role,
      testimonial_description,
      testimonial_photo
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.testimonial_name,
      data.testimonial_role,
      data.testimonial_description,
      data.testimonial_photo,
    ],
    (err: any, result: ResultSetHeader) => {
      if (err) {
        return callback(err);
      }

      callback(null, result);
    }
  );
};

// ================= Update Testimonial =================

export const updateTestimonialModel = (
  id: number,
  data: any,
  callback: Function
) => {
  const sql = `
    UPDATE testimonials
    SET
      testimonial_name = ?,
      testimonial_role = ?,
      testimonial_description = ?,
      testimonial_photo = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      data.testimonial_name,
      data.testimonial_role,
      data.testimonial_description,
      data.testimonial_photo,
      id,
    ],
    (err: any, result: ResultSetHeader) => {
      if (err) {
        return callback(err);
      }

      callback(null, result);
    }
  );
};

// ================= Delete Testimonial =================

export const deleteTestimonialModel = (
  id: number,
  callback: Function
) => {
  const sql = `
    DELETE FROM testimonials
    WHERE id = ?
  `;

  db.query(
    sql,
    [id],
    (err: any, result: ResultSetHeader) => {
      if (err) {
        return callback(err);
      }

      callback(null, result);
    }
  );
};