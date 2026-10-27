export const validateAQARCommittee = (
  data:any
) => {

  if(!data.aqarSlNo){
    return "Sl.No Required";
  }

  if(!data.aqarName){
    return "Name Required";
  }

  if(!data.aqarDesignation){
    return "Designation Required";
  }

  if(!data.aqarRole){
    return "Role Required";
  }

  return null;

};