import apiClient from "./apiClient";
import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/nirf";

export const saveNIRF = (
  data: FormData
) =>
  apiClient.post(API, data);

export const getNIRF = () =>
  apiClient.get(API);

export const updateNIRF = (
  id: string,
  data: FormData
) =>
  apiClient.put(
    `${API}/${id}`,
    data
  );

export const deleteNIRF = (
  id: string
) =>
  apiClient.delete(
    `${API}/${id}`
  );