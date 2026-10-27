
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/courses";

export const getCourses =
() =>
apiClient.get(API);

export const addCourse =
(data:any) =>
apiClient.post(
`${API}/add`,
data
);

export const updateCourse =
(
id:string,
data:any
) =>
apiClient.put(
`${API}/${id}`,
data
);

export const deleteCourse =
(id:string) =>
apiClient.delete(
`${API}/${id}`
);

export const getCourseByKey =
(
courseKey:string
)=>
apiClient.get(
`${API}/${courseKey}`
);