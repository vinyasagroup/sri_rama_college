export const validateCategory =
(
data:any
)=>{

if(
!data.categoryName
){
return "Category Name Required";
}

return null;

};