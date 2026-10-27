import apiClient from "./apiClient";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/news";

export const getNews = () =>
  apiClient.get(API);

export const saveNews = (
  data: FormData
) =>
  apiClient.post(API, data);

export const updateNews = (
  id: number,
  data: FormData
) =>
  apiClient.put(`${API}/${id}`, data);

export const deleteNews = (
  id: number
) =>
  apiClient.delete(`${API}/${id}`);