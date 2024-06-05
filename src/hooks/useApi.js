import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { toast } from "react-toastify";

import api from "../api/axios";

const useApi = (customConfig) => {
  const { token, logout } = useContext(AuthContext);
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (customConfig) config.headers = { ...customConfig };

        return config;
      },

      async (error) => await Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          logout();
          toast.success("Session expired");
        }
        return await Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [customConfig, logout, token]);

  return api;
};

export default useApi;
