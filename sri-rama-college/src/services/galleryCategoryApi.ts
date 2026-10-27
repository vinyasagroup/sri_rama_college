import axios from "axios";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/gallery-category";

export const getGalleryCategory = () => axios.get(API);

export const getGalleryCategoryById = (id: number) =>
  axios.get(`${API}/${id}`);

export const saveGalleryCategory = (data: FormData | object) =>
  axios.post(API, data);

export const updateGalleryCategory = (
  id: string,
  data: FormData | object
) =>
  axios.put(`${API}/${id}`, data);

export const deleteGalleryCategory = (id: string) =>
  axios.delete(`${API}/${id}`);