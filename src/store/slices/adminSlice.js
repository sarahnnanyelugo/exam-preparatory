import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminDashboard,
  getAdminUsers, getBusinessDashboard, getTopUpActivity, getTopUpIndex
} from "../actions/adminActions";
import moment from "moment/moment";
import {SUBMIT_ERROR} from "../../api/urls";



const initialAdminState = {
  adminsdata: {types:[],filters:{
      subjectFilter:"",typeFilter:"",yearFilter:"",
      loading:false,
      stats: {},
      usersMeta: {},
      users: [],
    }},
  businessdata: {types:[],filters:{
      subjectFilter:"",typeFilter:"",yearFilter:"",
      loading:false,
      isInviteModal:false,
      inviteUrl:false,
      stats: {},
      usersMeta: {},
      users: [],
      learners: [],
    }},
  headerData: {
    isSubscribeModal:false
  }

};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialAdminState,
  reducers: {
    setGlobalUserFilter(state, action) {
      localStorage.setItem(`filterUsers`, JSON.stringify({...action.payload}));
    },
    setGlobalAnalysisFilter(state, action) {
      localStorage.setItem(`analysisFilters`, JSON.stringify({...action.payload}));
      // console.log(JSON.parse(localStorage.getItem(`analysisFilters`) || "{}"));
    },
    setGlobalFlaggedFilter(state, action) {
      localStorage.setItem(`flaggedFilters`, JSON.stringify({...action.payload}));
      // console.log(JSON.parse(localStorage.getItem(`analysisFilters`) || "{}"));
    },
    toggleInviteModal(state, action) {
      state.businessdata.isInviteModal = action.payload.action;
    },
    toggleSubscribeModal(state, action) {
      state.headerData.isSubscribeModal = action.payload.action;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminUsers.pending, (state) => {
      state.adminsdata.loading = true;
    });
    builder.addCase(getAdminUsers.rejected, (state,action) => {
      state.adminsdata.error = action.payload;
    });
    builder.addCase(getAdminUsers.fulfilled, (state, action) => {
      state.adminsdata.users = action.payload.payload;
      state.adminsdata.usersMeta = action.payload.meta;
      state.adminsdata.loading = false;
    });
    builder.addCase(getAdminDashboard.pending, (state) => {
      state.adminsdata.loading = true;
    });
    builder.addCase(getAdminDashboard.rejected, (state,action) => {
      state.adminsdata.error = action.payload;
    });
    builder.addCase(getAdminDashboard.fulfilled, (state, action) => {
      state.adminsdata.stats = action.payload.stats;
      state.adminsdata.loading = false;
    });

    builder.addCase(getBusinessDashboard.pending, (state) => {
      state.businessdata.loading = true;
    });
    builder.addCase(getBusinessDashboard.rejected, (state,action) => {
      state.businessdata.error = action.payload;
    });
    builder.addCase(getBusinessDashboard.fulfilled, (state, action) => {
      state.businessdata.stats = action.payload.stats;
      state.businessdata.inviteUrl = action.payload.inviteUrl;
      state.businessdata.loading = false;
    });

    //TopUp
    builder.addCase(getTopUpIndex.pending, (state) => {
      state.businessdata.loading = true;
    });
    builder.addCase(getTopUpIndex.rejected, (state,action) => {
      state.businessdata.error = action.payload;
    });
    builder.addCase(getTopUpIndex.fulfilled, (state, action) => {
      state.businessdata.learners = action.payload.users;
      state.businessdata.loading = false;
      // console.log(state.businessdata.learners);
    });
    // TopUp Activity
    builder.addCase(getTopUpActivity.pending, (state) => {
      state.businessdata.loadingActivity = true;
    });
    builder.addCase(getTopUpActivity.rejected, (state,action) => {
      state.businessdata.error = action.payload;
    });
    builder.addCase(getTopUpActivity.fulfilled, (state, action) => {
      state.businessdata.activity = action.payload.activity;
      state.businessdata.isTransactionLoaded = true;
      state.businessdata.loadingActivity = false;
      // console.log(state.businessdata.learners);
    });
  },
});

export const {
      setUsers,
  setGlobalUserFilter,
  setGlobalAnalysisFilter,
  setGlobalFlaggedFilter,
  toggleInviteModal,
  toggleSubscribeModal
} = adminSlice.actions;

export default adminSlice.reducer;
