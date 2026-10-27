
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/application";

export const getDashboardCounts = () =>
  apiClient.get(`${API}/dashboard-counts`);

