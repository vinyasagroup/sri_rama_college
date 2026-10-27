import { API_BASE_URL } from "@/config/constants";
import apiClient from "./apiClient";

const API = API_BASE_URL + "/api/aicte";

// Save
export const saveAICTE = (
  data: FormData
) =>
  apiClient.post(API, data);

// Get
export const getAICTE = () =>
  apiClient.get(API);

// Update
export const updateAICTE = (
  id: string,
  data: FormData
) =>
  apiClient.put(
    `${API}/${id}`,
    data
  );

// Update Status
export const updateAICTEStatus = (
  id: string,
  status: string
) =>
  apiClient.put(
    `${API}/${id}/status`,
    { status }
  );

// Delete
export const deleteAICTE = (
  id: string
) =>
  apiClient.delete(
    `${API}/${id}`
  );