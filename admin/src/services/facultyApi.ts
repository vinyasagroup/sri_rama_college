import axios from "axios";

import {
  API_BASE_URL
} from "@/config/constants";

const API =
  `${API_BASE_URL}/api/faculty`;


// =====================================================
// GET
// =====================================================

export const getFaculty = () => {

  return axios.get(API);

};


// =====================================================
// SAVE
// =====================================================

export const saveFaculty = (
  data: FormData
) => {

  return axios.post(
    API,
    data,
    {
      headers: {
        Authorization:
          `Bearer ${sessionStorage.getItem("adminToken")}`,
      },
    }
  );

};


// =====================================================
// UPDATE
// =====================================================

export const updateFaculty = (
  id: string,
  data: FormData
) => {

  return axios.put(
    `${API}/${id}`,
    data,
    {
      headers: {
        Authorization:
          `Bearer ${sessionStorage.getItem("adminToken")}`,
      },
    }
  );

};


// =====================================================
// DELETE
// =====================================================

export const deleteFaculty = (
  id: string
) => {

  return axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${sessionStorage.getItem("adminToken")}`,
      },
    }
  );

};