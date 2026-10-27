export const validateFeedback = (
  data: any
) => {

  if (!data.name) {
    return "Name Required";
  }

  if (!data.email) {
    return "Email Required";
  }

  if (!data.rating) {
    return "Rating Required";
  }

  if (!data.message) {
    return "Feedback Required";
  }

  return null;
};