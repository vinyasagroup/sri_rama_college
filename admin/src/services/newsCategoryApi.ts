import apiClient from "./apiClient";
import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/news-category";

export const getNewsCategory = () =>
  apiClient.get(API);

export const saveNewsCategory = (
  data: any
) =>
  apiClient.post(API, data);

export const updateNewsCategory = (
  id: string,
  data: any
) =>
  apiClient.put(
    `${API}/${id}`,
    data
  );

export const deleteNewsCategory = (
  id: string
) =>
  apiClient.delete(
    `${API}/${id}`
  );