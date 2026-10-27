export const validateAchievement = (
data:any
)=>{

if(
!data.title ||
!data.year
){
return "Title and Year Required";
}

return null;

};