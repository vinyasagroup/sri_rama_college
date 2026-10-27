export const validateNIRF = (
  data:any
) => {

  if(!data.nirfdocYear){

    return "Academic Year Required";

  }

  return null;

};