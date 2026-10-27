
import { API_BASE_URL} from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL +  "/api/carousel";

// ================= Get All =================

export const getCarousel = () =>
  apiClient.get(API);

// ================= Get By Id =================

export const getCarouselById = (
  id: number
) =>
  apiClient.get(`${API}/${id}`);

// ================= Save =================

export const saveCarousel = (
  data: FormData
) =>
  apiClient.post(API, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ================= Update =================

export const updateCarousel = (
  id: number,
  data: FormData
) =>
  apiClient.put(`${API}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ================= Delete =================

export const deleteCarousel = (
  id: number
) =>
  apiClient.delete(`${API}/${id}`);