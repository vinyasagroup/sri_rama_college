import axios from "axios";
import { API_BASE_URL } from "@/config/constants";

const API = API_BASE_URL + "/api/slider";

// ================= GET =================

export const getSliderImages = () =>
  axios.get(API);

// ================= SAVE =================

export const saveSliderImage = (
  data: FormData
) =>
  axios.post(
    API,
    data,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

// ================= UPDATE =================

export const updateSliderImage = (
  id: string,
  data: FormData
) =>
  axios.put(
    `${API}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

// ================= DELETE =================

export const deleteSliderImage = (
  id: string
) =>
  axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
      },
    }
  );