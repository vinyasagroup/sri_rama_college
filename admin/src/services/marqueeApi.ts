import apiClient from "./apiClient";
import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/marquee";

export const saveMarquee = (
  data: any
) => apiClient.post(API, data);

export const getMarquee = () =>
  apiClient.get(API);

export const updateMarquee = (
  id: string,
  data: any
) =>
  apiClient.put(
    `${API}/${id}`,
    data
  );

export const deleteMarquee = (
  id: string
) =>
  apiClient.delete(
    `${API}/${id}`
  );