import axios from "axios";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/courses";

export const getCourseByKey =
(
courseKey:string
)=>
axios.get(
`${API}/${courseKey}`
);

export const getCourses =
()=>
axios.get(API);