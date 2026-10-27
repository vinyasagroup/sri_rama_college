export const validateAQAR = (
  data: any
) => {

  if (!data.aqardocYear) {

    return "Academic Year Required";

  }

  return null;

};