export const validateNAAC = (
  data:any
) => {

  if(!data.naacdocYear){

    return "Academic Year Required";

  }

  return null;

};