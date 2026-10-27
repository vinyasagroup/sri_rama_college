import db from "../config/db";

export const saveTeamModel =
(
members:any,
callback:any
)=>{

const values =
members.map(
(item:any)=>[
item.slNo,
item.name,
item.designation,
item.role
]
);

db.query(

`
INSERT INTO iqac_team
(
sl_no,
name,
designation,
role
)
VALUES ?
`,

[values],

callback

);

};

export const getTeamModel =
(
callback:any
)=>{

db.query(

  "SELECT * FROM iqac_team ORDER BY CAST(sl_no AS UNSIGNED) ASC",

callback

);

};

export const updateTeamModel =
(
id:string,
data:any,
callback:any
)=>{

db.query(

`
UPDATE iqac_team
SET
sl_no=?,
name=?,
designation=?,
role=?
WHERE id=?
`,

[
data.slNo,
data.name,
data.designation,
data.role,
id
],

callback

);

};

export const deleteTeamModel =
(
id:string,
callback:any
)=>{

db.query(

"DELETE FROM iqac_team WHERE id=?",

[id],

callback

);

};