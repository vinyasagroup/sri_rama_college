import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";


export const saveGalleryCategory = (data:any) => {
  return apiClient.post(
   API_BASE_URL +  "/api/gallery-category",
    data
  );
};

export const getGalleryCategory = () => {
  return apiClient.get(
  API_BASE_URL +  "/api/gallery-category"
  );
};

export const updateGalleryCategory = (
  id:string,
  data:any
) => {
  return apiClient.put(
    API_BASE_URL +  `/api/gallery-category/${id}`,
    data
  );
};

export const deleteGalleryCategory = (
  id:string
) => {
  return apiClient.delete(
    API_BASE_URL +  `/api/gallery-category/${id}`
  );
};