
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/application";

export const getApplications = () => {
  return apiClient.get(API);
};

export const updateApplicationStatus = (
  id: string,
  status: string
) => {
  return apiClient.put(`${API}/status/${id}`, {
    status,
  });
};

//Monthly  charts
export const getMonthlyApplications = () =>
  apiClient.get(API + "/monthly-applications");

export const getCourseWiseStats = () =>
  apiClient.get(API + "/course-wise-stats");



//Recently
export const getRecentApplications = () =>
  apiClient.get(`${API}/recent-applications`);