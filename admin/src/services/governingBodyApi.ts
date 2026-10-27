
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/governing-body";

export const getGoverningBody =
() => apiClient.get(API);

export const saveGoverningBody =
(data:any) =>
apiClient.post(API, data);

export const updateGoverningBody =
(
id:string,
data:any
) =>
apiClient.put(
`${API}/${id}`,
data
);

export const deleteGoverningBody =
(id:string) =>
apiClient.delete(
`${API}/${id}`
);