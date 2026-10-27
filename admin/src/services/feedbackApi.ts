
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API_URL = API_BASE_URL +  "/api/feedback";

export const saveFeedback = (
  data: any
) => {
  return apiClient.post(
    API_URL,
    data
  );
};

export const getFeedbacks = () => {
  return apiClient.get(
    API_URL
  );
};

export const deleteFeedback = (
  id: string
) => {
  return apiClient.delete(
    `${API_URL}/${id}`
  );
};