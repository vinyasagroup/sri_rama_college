

import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL + "/api/achievements";

export const getAchievements =
() => apiClient.get(API);

export const saveAchievement =
(data: FormData) =>
apiClient.post(API, data);

export const updateAchievement =
(
id: string,
data: FormData
) =>
apiClient.put(
`${API}/${id}`,
data
);

export const deleteAchievement =
(id: string) =>
apiClient.delete(
`${API}/${id}`
);