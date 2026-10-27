import apiClient from "./apiClient";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/naac";

export const saveNAAC = (
  data: FormData
) =>
  apiClient.post(API, data);

export const getNAAC = () =>
  apiClient.get(API);

export const updateNAAC = (
  id:string,
  data:FormData
) =>
  apiClient.put(
    `${API}/${id}`,
    data
  );

export const deleteNAAC = (
  id:string
) =>
  apiClient.delete(
    `${API}/${id}`
  );