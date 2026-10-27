import apiClient from "./apiClient";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/iqac-document";

export const getDocuments =
() =>
apiClient.get(API);

export const saveDocument =
(data:FormData) =>
apiClient.post(
API,
data,
{
headers:{
"Content-Type":
"multipart/form-data"
}
}
);

export const updateDocument =
(
id:string,
data:FormData
)=>
apiClient.put(
`${API}/${id}`,
data,
{
headers:{
"Content-Type":
"multipart/form-data"
}
}
);

export const deleteDocument =
(id:string)=>
apiClient.delete(
`${API}/${id}`
);