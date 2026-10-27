import {

  saveAQARCommitteeModel,
  getAQARCommitteeModel,
  updateAQARCommitteeModel,
  deleteAQARCommitteeModel

} from "../models/aqarCommitteeModel";

import {

  validateAQARCommittee

} from "../schemas/aqarCommitteeSchema";

export const saveAQARCommittee = (
  req:any,
  res:any
) => {

  const error =
    validateAQARCommittee(req.body);

  if(error){

    return res.status(400).json({
      message:error
    });

  }

  saveAQARCommitteeModel(

    req.body,

    (err:any)=>{

      if(err){

        return res.status(500).json(err);

      }

      res.json({
        message:"AQAR Committee Member Added"
      });

    }

  );

};

export const getAQARCommittee = (
  _req:any,
  res:any
) => {

  getAQARCommitteeModel(

    (
      err:any,
      result:any
    )=>{

      if(err){

        return res.status(500).json(err);

      }

      res.json(result);

    }

  );

};

export const updateAQARCommittee = (
  req:any,
  res:any
) => {

  const error =
    validateAQARCommittee(req.body);

  if(error){

    return res.status(400).json({
      message:error
    });

  }

  updateAQARCommitteeModel(

    req.params.id,

    req.body,

    (err:any)=>{

      if(err){

        return res.status(500).json(err);

      }

      res.json({
        message:"AQAR Committee Updated"
      });

    }

  );

};

export const deleteAQARCommittee = (
  req:any,
  res:any
) => {

  deleteAQARCommitteeModel(

    req.params.id,

    (err:any)=>{

      if(err){

        return res.status(500).json(err);

      }

      res.json({
        message:"AQAR Committee Deleted"
      });

    }

  );
 
};