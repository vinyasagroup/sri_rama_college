import apiClient from "./apiClient";
import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/logo";

export const saveLogo =
  (data:any) =>
    apiClient.post(API, data);

export const getLogo =
  () =>
    apiClient.get(API);

export const updateLogo =
  (
    id:string,
    data:any
  ) =>
    apiClient.put(
      `${API}/${id}`,
      data
    );

export const deleteLogo =
  (id:string) =>
    apiClient.delete(
      `${API}/${id}`
    );