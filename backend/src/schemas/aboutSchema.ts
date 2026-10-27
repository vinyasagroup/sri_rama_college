export const validateAbout =
(
data:any
)=>{

if(
!data.collegeName
||
!data.quote
){

return
"Required fields missing";

}

return null;

};