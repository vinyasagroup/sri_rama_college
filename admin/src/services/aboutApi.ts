
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/about";

export const saveAbout =
(
data:FormData
)=>
apiClient.post(
`${API}/save`,
data
);

export const updateAbout =
(
data:FormData
)=>
apiClient.put(
`${API}/update`,
data
);

export const getAbout =
()=>
apiClient.get(
API
);

export const deleteAbout =
()=>
apiClient.delete(
`${API}/delete`
);