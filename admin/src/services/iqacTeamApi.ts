import apiClient from "./apiClient";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/iqac-team";

export const saveTeam =
(data:any)=>
apiClient.post(
API,
data
);

export const getTeam =
()=>
apiClient.get(
API
);

export const updateTeam =
(
id:string,
data:any
)=>
apiClient.put(
`${API}/${id}`,
data
);

export const deleteTeam =
(id:string)=>
apiClient.delete(
`${API}/${id}`
);