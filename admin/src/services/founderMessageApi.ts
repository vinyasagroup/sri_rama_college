
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/founder-message";

export const getFounder =
() => apiClient.get(API);

export const saveFounder =
(data:any) =>
apiClient.post(API,data);

export const updateFounder =
(
id:string,
data:any
) =>
apiClient.put(
`${API}/${id}`,
data
);

export const deleteFounder =
(id:string) =>
apiClient.delete(
`${API}/${id}`
);