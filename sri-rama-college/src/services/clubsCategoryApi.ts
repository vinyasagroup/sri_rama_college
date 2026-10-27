import axios from "axios";
import { API_BASE_URL } from "@/config/constants";

const API = `${API_BASE_URL}/api/clubs-category`;

export const getClubsCategory = () => {
  return axios.get(API);
};