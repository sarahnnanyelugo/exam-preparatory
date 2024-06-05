import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_ANALYSIS_DATA_URL,
  GET_ANALYSIS_URL, GET_COUNTRIES_URL,
  GET_FLAGGED_ANALYSIS_URL,
  GET_PASTQUESTIONS_URL,
  TOGGLE_FLAGGED_ANALYSIS_URL
} from "../../api/urls";
import api from "../../api/axios";
import data from "bootstrap/js/src/dom/data";

export const getPastQuestions = createAsyncThunk("exam/getPastQuestions", async (data, { rejectWithValue }) => {
  try {
    const response = await api.get(`${GET_PASTQUESTIONS_URL}?pageSize=${data.pageSize}&currentPage=${data.currentPage}&sort=${data.sort}`, {
      params: { type: data?.type, subject: data?.subject, year: data?.year, is_filter: data?.is_filter},
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

export const getQuestionAnalysis = createAsyncThunk("exam/getAnalysis", async (data, { rejectWithValue }) => {
  try {
    const response = await api.get(`${GET_ANALYSIS_URL}?pageSize=${data.pageSize}&currentPage=${data.currentPage}&sort=${data.sort}`, {
      params: { type: data?.type,
        subject: data?.subject,
        year: data?.year,
        isAdmin: data?.isAdmin,
        is_filter: data?.is_filter, startDate: data?.start_date, endDate: data?.end_date},
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

export const getTestAnalysisDetails = createAsyncThunk("exam/getTestAnalysisDetails", async ( test_id , { rejectWithValue }) => {
  try {
    const result = await api.get(`${GET_ANALYSIS_DATA_URL}/${test_id}`);
    return result.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || "Error fetching data");
  }
});

export const getTestData = createAsyncThunk("exam/getTest", async ( payload , { rejectWithValue }) => {
  try {
    const result = await api.get(`${GET_PASTQUESTIONS_URL}/${payload.uniqueId}`, {
      params: {  is_reset: payload?.is_reset},
    });
    return result.data;
  } catch (error) {
    return rejectWithValue({error: (error?.response?.data?.message || "Error fetching data"),uniqueId:payload.uniqueId});
  }
});

export const sendTestData = createAsyncThunk("exam/sendTest", async ( payload , { rejectWithValue }) => {
  try {
    const result = await api.post(`${GET_PASTQUESTIONS_URL}/${payload.uniqueId}`,
        payload);
    result.data.uniqueId = payload.uniqueId;
    return result.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || "Error Sending data");
  }
});

export const getFlaggedQuestionAnalysis = createAsyncThunk(
    "exam/getFlaggedAnalysis", async (data, { rejectWithValue }) => {
  try {
    const response = await api.get(`${GET_FLAGGED_ANALYSIS_URL}?pageSize=${data.pageSize}&currentPage=${data.currentPage}&sort=${data.sort}`, {
      params: { type: data?.type, subject: data?.subject, year: data?.year, isAdmin: data?.isAdmin, is_filter: data?.is_filter, search: data?.search },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

export const toggleQuestionFlag = createAsyncThunk("exam/toggleFlag",
    async ( payload , { rejectWithValue }) => {
  try {
    const result = await api.post(`${TOGGLE_FLAGGED_ANALYSIS_URL}`,
        payload);
    return result.data;
  } catch (error) {
    return rejectWithValue((error?.response?.data?.message || "Error Sending data"));
  }
});

export const fetchCountries = createAsyncThunk("exam/fetchCountries",
    async ( payload , { rejectWithValue }) => {
      try {
        const result = await api.post(`${GET_COUNTRIES_URL}`,
            payload);
        return result.data;
      } catch (error) {
        return rejectWithValue((error?.response?.data?.message || "Error Sending data"));
      }
    });


