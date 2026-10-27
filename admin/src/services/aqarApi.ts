
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/aqar";

export const saveAQAR = (
  data: FormData
) =>
  apiClient.post(API, data);

export const getAQAR = () =>
  apiClient.get(API);

export const updateAQAR = (
  id: string,
  data: FormData
) =>
  apiClient.put(
    `${API}/${id}`,
    data
  );

export const deleteAQAR = (
  id: string
) =>
 apiClient.delete(
    `${API}/${id}`
  );