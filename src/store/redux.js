import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./slices/examSlice";
import walletReducer from "./slices/walletActivitySlice";
import adminReducer from "./slices/adminSlice";

const store = configureStore({
  reducer: {
    exam: examReducer,
    wallet: walletReducer,
    admin: adminReducer,
  },
});

export default store;
