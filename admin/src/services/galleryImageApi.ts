
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/gallery-image";

export const saveGalleryImage = (
  data:any
) => apiClient.post(API,data);

export const getGalleryImage = () =>
  apiClient.get(API);

export const updateGalleryImage = (
  id:string,
  data:any
) =>
apiClient.put(`${API}/${id}`,data);

export const deleteGalleryImage = (
  id:string
) =>
  apiClient.delete(`${API}/${id}`);