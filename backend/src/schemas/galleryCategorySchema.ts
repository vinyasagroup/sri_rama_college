export const validateGalleryCategory = (
  data:any
) => {

  if(!data.categoryName){
    return "Gallery Category Name is required";
  }

  return null;

};