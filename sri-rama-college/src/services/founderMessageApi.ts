import axios from "axios";

import { API_BASE_URL} from "@/config/constants";

const API = API_BASE_URL +  "/api/founder-message";

export const getFounder = () =>
  axios.get(API);

export const saveFounder = (
  data: FormData
) =>
  axios.post(
    API,
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

export const updateFounder = (
  id: string,
  data: FormData
) =>
  axios.put(
    `${API}/${id}`,
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

export const deleteFounder = (
  id: string
) =>
  axios.delete(
    `${API}/${id}`
  );