import apiClient from "./apiClient";
import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/testimonials";

export const getTestimonials = () => apiClient.get(API);

export const getTestimonialById = (id: string | number) =>
  apiClient.get(`${API}/${id}`);

export const saveTestimonial = (data: FormData) =>
  apiClient.post(API, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateTestimonial = (
  id: string | number,
  data: FormData
) =>
  apiClient.put(`${API}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteTestimonial = (id: string | number) =>
  apiClient.delete(`${API}/${id}`);