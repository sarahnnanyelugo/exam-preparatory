import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_ADMIN_URL,
  GET_ANALYSIS_URL,
  GET_BUSINESS_URL, GET_TOPUP_ACTIVITY_BUSINESS_URL,
  GET_TOPUP_BUSINESS_URL,
  GET_USERS_ADMIN_URL
} from "../../api/urls";
import api from "../../api/axios";


export const getAdminUsers = createAsyncThunk("users/admin", async (data, { rejectWithValue }) => {
  try {
    const response = await api.get(`${GET_USERS_ADMIN_URL}?pageSize=${data.pageSize}&currentPage=${data.currentPage}&sort=${data.sort}`, {
      params: { search: data?.search},
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

export const getAdminDashboard = createAsyncThunk("admin", async (data, { rejectWithValue }) => {
  try {
    const response = await api.get(`${GET_ADMIN_URL}`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

export const getBusinessDashboard =
    createAsyncThunk("business", async (data, { rejectWithValue }) => {
  try {
    const response = await api.get(`${GET_BUSINESS_URL}`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

export const getTopUpIndex =
    createAsyncThunk("businessTopup",
        async (data, { rejectWithValue}) => {
      try {
        const response = await api.get(`${GET_TOPUP_BUSINESS_URL}`,
            {
          params: data,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message || "Error fetching data");
      }
    });

export const getTopUpActivity =
    createAsyncThunk("businessTopupActivity",
        async (data, { rejectWithValue}) => {
          try {
            const response = await api.get(`${GET_TOPUP_ACTIVITY_BUSINESS_URL}`,
                {
                  params: data,
                });
            return response.data;
          } catch (error) {
            return rejectWithValue(error.message || "Error fetching data");
          }
        });
