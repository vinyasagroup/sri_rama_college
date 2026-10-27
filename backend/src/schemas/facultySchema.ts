export const validateFaculty = (body: any) => {
  if (
    !body.faculty_quote ||
    !body.faculty_quote.trim()
  ) {
    return "Faculty Quote is Required";
  }

  return null;
};