//centeralized API setup

import axios from "axios";
import qs from "qs";

const apiBaseUrl = import.meta.env.VITE_API_URL || "";
const api = axios.create({
  baseURL: apiBaseUrl ? `${apiBaseUrl}/api` : "/api",
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export default api;
