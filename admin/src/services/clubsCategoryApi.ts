
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/clubs-category";

// Get All Categories
export const getClubsCategory = () => {
  return apiClient.get(API);
};

// Save Category
export const saveClubsCategory = (data: {
  clubCategoryName: string;
}) => {
  return apiClient.post(API, data);
};

// Update Category
export const updateClubsCategory = (
  id: string,
  data: {
    clubCategoryName: string;
  }
) => {
  return apiClient.put(`${API}/${id}`, data);
};

// Delete Category
export const deleteClubsCategory = (id: string) => {
  return apiClient.delete(`${API}/${id}`);
};