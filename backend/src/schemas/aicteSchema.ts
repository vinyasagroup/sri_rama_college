export const validateAICTE = (
  data: any
) => {

  if (!data.aictedocYear) {
    return "Academic Year Required";
  }

  return null;

};