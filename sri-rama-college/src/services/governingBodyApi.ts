import axios from "axios";
import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/governing-body";

export const getGoverningBody =
() => axios.get(API);