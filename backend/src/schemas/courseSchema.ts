export const validateCourse = (
  data: any
) => {
  if (
    !data.courseKey ||
    !data.title
  ) {
    return "Course Key and Title required";
  }

  return null;
};