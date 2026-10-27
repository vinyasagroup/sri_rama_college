
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/aqar-committee";

export const getAQARCommittee = () =>
  apiClient.get(API);

export const saveAQARCommittee = (data: any) =>
  apiClient.post(API, data);

export const updateAQARCommittee = (
  id: string,
  data: any
) =>
  apiClient.put(`${API}/${id}`, data);

export const deleteAQARCommittee = (
  id: string
) =>
  apiClient.delete(`${API}/${id}`);