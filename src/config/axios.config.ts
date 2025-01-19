import { API_URL } from "./api";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const updateTokenAxios = (token: string) => {
  if (!token) {
    delete axiosInstance.defaults.headers.common.Authorization;
    return false;
  }

  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

  return true;
};
