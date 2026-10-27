import db from "../config/db";

export const getCoursesModel = (
  callback: any
) => {
  db.query(
    "SELECT * FROM courses",
    callback
  );
};

export const getCourseByKeyModel = (
  courseKey: string,
  callback: any
) => {
  db.query(
    "SELECT * FROM courses WHERE course_key=?",
    [courseKey],
    callback
  );
};

export const createCourseModel = (
  data: any,
  callback: any
) => {

  const sql = `
  INSERT INTO courses
  (
    course_key,
    title,
    duration,
    intake,
    eligibility,
    overview,
    curriculum,
    scope_career,
    higher_education,
    skills_developed,
    subjects,
  
    lab
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.courseKey,
      data.title,
      data.duration,
      data.intake,
      data.eligibility,
      data.overview,
      data.curriculum,
      data.scopeCareer,
      data.higherEducation,
      data.skillsDeveloped,
      JSON.stringify(data.subjects),
      
      data.lab,
    ],
    callback
  );
};

export const updateCourseModel = (
  id: string,
  data: any,
  callback: any
) => {

  const sql = `
  UPDATE courses
  SET
    course_key=?,
    title=?,
    duration=?,
    intake=?,
    eligibility=?,
    overview=?,
    curriculum=?,
    scope_career=?,
    higher_education=?,
    skills_developed=?,
    subjects=?,
    lab=?
  WHERE id=?
  `;

  db.query(
    sql,
    [
      data.courseKey,
      data.title,
      data.duration,
      data.intake,
      data.eligibility,
      data.overview,
      data.curriculum,
      data.scopeCareer,
      data.higherEducation,
      data.skillsDeveloped,
      JSON.stringify(data.subjects),
      data.lab,
      id,
    ],
    callback
  );
};

export const deleteCourseModel = (
  id: string,
  callback: any
) => {
  db.query(
    "DELETE FROM courses WHERE id=?",
    [id],
    callback
  );
};