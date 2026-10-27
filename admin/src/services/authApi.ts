
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/auth";

export const login = (
  data: {
    username: string;
    password: string;
  }
) =>
apiClient.post(
    `${API}/login`,
    data
  );