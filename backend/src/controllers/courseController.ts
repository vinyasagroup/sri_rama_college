import {
  getCoursesModel,
  getCourseByKeyModel,
  createCourseModel,
  updateCourseModel,
  deleteCourseModel,
} from "../models/courseModel";

import {
  validateCourse,
} from "../schemas/courseSchema";

export const getCourses = (
  _req: any,
  res: any
) => {
  getCoursesModel(
    (
      err: any,
      result: any
    ) => {
      if (err)
        return res
          .status(500)
          .json(err);

      res.json(result);
    }
  );
};

export const getCourseByKey = (
  req: any,
  res: any
) => {
  getCourseByKeyModel(
    req.params.courseKey,

    (
      err: any,
      result: any
    ) => {
      if (err)
        return res
          .status(500)
          .json(err);

      res.json(
        result[0]
      );
    }
  );
};

export const createCourse = (
  req: any,
  res: any
) => {
  const error =
    validateCourse(
      req.body
    );

  if (error) {
    return res
      .status(400)
      .json({
        message:
          error,
      });
  }

  createCourseModel(
    req.body,

    (
      err: any
    ) => {
      if (err)
        return res
          .status(500)
          .json(err);

      res.json({
        message:
          "Course Saved",
      });
    }
  );
};

export const updateCourse = (
  req: any,
  res: any
) => {
  updateCourseModel(
    req.params.id,
    req.body,

    (
      err: any
    ) => {
      if (err)
        return res
          .status(500)
          .json(err);

      res.json({
        message:
          "Course Updated",
      });
    }
  );
};

export const deleteCourse = (
  req: any,
  res: any
) => {
  deleteCourseModel(
    req.params.id,

    (
      err: any
    ) => {
      if (err)
        return res
          .status(500)
          .json(err);

      res.json({
        message:
          "Deleted",
      });
    }
  );
};