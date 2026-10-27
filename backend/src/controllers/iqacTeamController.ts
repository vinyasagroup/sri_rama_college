import {

saveTeamModel,
getTeamModel,
updateTeamModel,
deleteTeamModel

}

from "../models/iqacTeamModel";

export const saveTeam =
(
req:any,
res:any
)=>{

saveTeamModel(

req.body,

(err:any)=>{

if(err)
return res.status(500).json(err);

res.json({
message:"Team Saved"
});

}

);

};

export const getTeam =
(
_req:any,
res:any
)=>{

getTeamModel(

(
err:any,
result:any
)=>{

if(err)
return res.status(500).json(err);

res.json(result);

}

);

};

export const updateTeam =
(
req:any,
res:any
)=>{

updateTeamModel(

req.params.id,

req.body,

(err:any)=>{

if(err)
return res.status(500).json(err);

res.json({
message:"Updated"
});

}

);

};

export const deleteTeam =
(
req:any,
res:any
)=>{

deleteTeamModel(

req.params.id,

(err:any)=>{

if(err)
return res.status(500).json(err);

res.json({
message:"Deleted"
});

}

);

};