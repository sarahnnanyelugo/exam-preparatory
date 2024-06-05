import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getWalletBalance = createAsyncThunk("wallet/getWalletBalance", async (user, { rejectWithValue }) => {
  try {
    const result = await api.get(`/wallet/${user.id}/balance`);
    return result.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

export const getWalletActivity = createAsyncThunk("wallet/getWalletActivity", async ({ user, pageSize, currentPage, activeView }, { rejectWithValue }) => {
  try {
    const result = await api.get(`/wallet/${user.id}/walletactivity?pageSize=${pageSize}&currentPage=${currentPage}&type=${activeView}`);
    return result.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

export const getReferralActivity = createAsyncThunk(
    "wallet/getReferralActivity",
    async ({ user, pageSize, currentPage },
           { rejectWithValue }) => {
  try {
    const result = await api.get(`/wallet/${user.id}/referralactivity?
    pageSize=${pageSize}&currentPage=${currentPage}`);
    return result.data;
  } catch (error) {
    return rejectWithValue(error.message || "Error fetching data");
  }
});

