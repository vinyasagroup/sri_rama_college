import axios from "axios";
import { API_BASE_URL} from "@/config/constants";

export const saveApplication = (
  data:any
) => {

  return axios.post(
    API_BASE_URL +  "/api/application",
    data
  );

};