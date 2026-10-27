import axios from "axios";

import { API_BASE_URL} from "@/config/constants";

const API_URL = API_BASE_URL +  "/api/feedback";

export const saveFeedback = (
  data: any
) => {
  return axios.post(
    API_URL,
    data
  );
};

export const getFeedback = () => {
  return axios.get(
    API_URL
  );
};

export const deleteFeedback = (
  id: string
) => {
  return axios.delete(
    `${API_URL}/${id}`
  );
};