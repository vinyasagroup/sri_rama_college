import axios from "axios";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/about";

export const getAbout =
async () => {

return axios.get(
API
);

};