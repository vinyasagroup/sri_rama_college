import axios from "axios";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/clubs";

export const getClubs = () => axios.get(API);

export const getClubById = (id: number) =>
  axios.get(`${API}/${id}`);