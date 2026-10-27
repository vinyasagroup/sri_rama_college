import axios from "axios";
import { API_BASE_URL } from "@/config/constants";

const API = `${API_BASE_URL}/api/videos`;

interface VideoData {
  status: string;
  video: string;
}

// ================= SAVE =================

export const saveVideo = (data: VideoData) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
      "Content-Type": "application/json",
    },
  });

// ================= GET =================

export const getVideos = () =>
  axios.get(API);

// ================= UPDATE =================

export const updateVideo = (
  id: string,
  data: VideoData
) =>
  axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
      "Content-Type": "application/json",
    },
  });

// ================= DELETE =================

export const deleteVideo = (id: string) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
    },
  });