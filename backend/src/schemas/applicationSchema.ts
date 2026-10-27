export const validateApplication = (
  data:any
) => {

  if(!data.applicationFor){
    return "Please select a course";
  }

  if(!data.fullName){
    return "Full Name Required";
  }

  if(!data.gender){
    return "Gender Required";
  }

  if(!data.dob){
    return "Date of Birth Required";
  }

  if(!data.email){
    return "Email Required";
  }

  if(!data.phone){
    return "Phone Number Required";
  }

  if(!data.fatherName){
    return "Father Name Required";
  }

  if(!data.motherName){
    return "Mother Name Required";
  }

  if(!data.sslcSchool){
    return "SSLC School Required";
  }

  if(!data.sslcBoard){
    return "SSLC Board Required";
  }

  if(!data.sslcPercentage){
    return "SSLC Percentage Required";
  }

  if(!data.sslcYear){
    return "SSLC Year Required";
  }

  if(!data.pucSchool){
    return "PUC College Required";
  }

  if(!data.pucBoard){
    return "PUC Board Required";
  }

  if(!data.pucPercentage){
    return "PUC Percentage Required";
  }

  if(!data.pucYear){
    return "PUC Year Required";
  }

  return null;

};