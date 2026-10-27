
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/clubs";

export const getClubs = () =>
  apiClient.get(API);

export const getClubById = (id: number) =>
  apiClient.get(`${API}/${id}`);

export const saveClub = (data: FormData) =>
  apiClient.post(API, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateClub = (
  id: number,
  data: FormData
) =>
  apiClient.put(`${API}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteClub = (id: number) =>
  apiClient.delete(`${API}/${id}`);