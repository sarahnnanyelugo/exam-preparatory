import axios from "axios";
var config = require('./config.js');

const api = axios.create({
  baseURL: config.SERVER_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("token");

  if (!config.headers.Authorization && storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location = "./login";
    }
    return await Promise.reject(error);
  }
);

export default api;
