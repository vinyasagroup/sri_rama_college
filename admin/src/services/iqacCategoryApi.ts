import apiClient from "./apiClient";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/iqac/category";

export const saveCategory =
(data:any) =>
apiClient.post(API,data);

export const getCategories =
() =>
apiClient.get(API);

export const updateCategory =
(
id:string,
data:any
) =>
apiClient.put(
`${API}/${id}`, 
data
);

export const deleteCategory =
(id:string) =>
apiClient.delete(
`${API}/${id}`
);