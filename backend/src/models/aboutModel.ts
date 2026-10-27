import db from "../config/db";

export const saveAboutModel =
(
data:any,
callback:any
)=>{

db.query(

`
INSERT INTO about
(
college_name,
quote,
content,
vision,
mission,
college_photo
)

VALUES
(
?,
?,
?,
?,
?,
?
)
`,

[
data.collegeName,
data.quote,
data.content,
data.vision,
data.mission,
data.photo
],

callback

);

};

export const getAboutModel =
(
callback:any
)=>{

db.query(

"SELECT * FROM about LIMIT 1",

callback

);

};

export const updateAboutModel =
(
id:number,
data:any,
callback:any
)=>{

db.query(

`
UPDATE about
SET
college_name=?,
quote=?,
content=?,
vision=?,
mission=?,
college_photo=?

WHERE id=?
`,

[
data.collegeName,
data.quote,
data.content,
data.vision,
data.mission,
data.photo,
id
],

callback

);

};

export const deleteAboutModel =
(
callback:any
)=>{

db.query(

"DELETE FROM about",

callback

);

};