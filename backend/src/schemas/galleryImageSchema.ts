export const validateGalleryImage = (
  data:any
) => {

  if (!data.title) {
    return "Title Required";
  }

  if (!data.galleryCategoryName) {
    return "Gallery Category Required";
  }

  return null;
};