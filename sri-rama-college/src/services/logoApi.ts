import axios from "axios";
import { API_BASE_URL} from "@/config/constants";

const API_URL = API_BASE_URL +  "/api/logo";

export const getLogo = () => {
  return axios.get(API_URL);
};