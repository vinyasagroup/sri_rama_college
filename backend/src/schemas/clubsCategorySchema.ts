export const validateClubsCategory = (
  data: any
) => {

  if (!data.clubCategoryName) {

    return "Club Category Name is required";

  }

  return null;

};