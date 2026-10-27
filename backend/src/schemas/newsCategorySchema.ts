export const validateNewsCategory = (
  data: any
) => {

  if (!data.newsCategoryName) {

    return "News Category Required";

  }

  return null;

};