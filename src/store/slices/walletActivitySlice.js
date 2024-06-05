import { createSlice } from "@reduxjs/toolkit";
import {getReferralActivity, getWalletActivity, getWalletBalance} from "../actions/walletActions";

const initialWalletState = {
  balance: 0,
  currentUnit: 0,
  freeUnit: 0,
  activity: {},
  bonusData: {},
  loading: true,
  activeView: "Credit",
  totalEarned: 0,
  referralUrl: "",
  doneLoading: false,
};
const walletSlice = createSlice({
  name: "wallet",
  initialState: initialWalletState,
  reducers: {
    setBalance(state, action) {
      state.balance = action.payload;
    },

    setActivity(state, actions) {
      state.activity = actions.payload;
    },

    setActiveView(state, actions) {
      state.activeView = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
      })
        .addCase(getWalletBalance.rejected, (state, action) => {
          state.balance = 0;
        })
      .addCase(getWalletActivity.fulfilled, (state, action) => {
        state.activity = action.payload.activity;
      })
      .addCase(getWalletActivity.rejected, (state, action) => {
          state.activity = {};
        })
        .addCase(getReferralActivity.fulfilled, (state, action) => {
          state.bonusData = action.payload.bonusData;
          if(action.payload.referralUrl) {
            state.totalEarned = action.payload.totalEarned;
            state.referralUrl = action.payload.referralUrl;
            state.currentUnit = action.payload.currentUnit;
            state.freeUnit = action.payload.freeUnit;
          }
          state.loading = false;
          state.doneLoading = true;
        })
        .addCase(getReferralActivity.rejected, (state, action) => {
          state.bonusData = {};
          state.loading = false;
        });
  },
});

export const { setBalance, setActivity, setActiveView } = walletSlice.actions;

export default walletSlice.reducer;
