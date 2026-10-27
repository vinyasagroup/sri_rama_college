export const validateGoverningBody = (
  data: any
) => {

  if (
    !data.name
  ) {
    return "Name is required";
  }

  if (
    !data.role
  ) {
    return "Role is required";
  }

  if (
    !data.content
  ) {
    return "Content is required";
  }

  return null;

};