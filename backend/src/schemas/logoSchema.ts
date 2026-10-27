export const validateLogo = (
  data:any
) => {

  if(!data.collegeName){
    return "College Name Required";
  }

  if(!data.location){
    return "Location Required";
  }

  return null;
};