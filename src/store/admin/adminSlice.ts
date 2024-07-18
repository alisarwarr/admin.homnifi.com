import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAdminPermission {
  _id: string;
  name: string;
  module: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminStateSlice {
  data: any;
  list: any[];
  activity: any;
  adminPermissionsList: IAdminPermission[];
  rolesList: any[];
  selectedAdmin: any;
  adminDataDetail: any;
}

const initialState: AdminStateSlice = {
  data: null,
  list: [],
  activity: null,
  adminPermissionsList: [],
  rolesList: [],
  selectedAdmin: null,
  adminDataDetail: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminData: (state, action: PayloadAction<any>) => {
      return { ...state, data: action.payload };
    },
    setAdminList: (state, action: PayloadAction<any>) => {
      return { ...state, list: action.payload };
    },
    setAdminActivity: (state, action: PayloadAction<any>) => {
      return { ...state, activity: action.payload };
    },
    setAdminPermissionsList: (state, action: PayloadAction<any>) => {
      return { ...state, adminPermissionsList: action.payload };
    },
    setRoleList: (state, action: PayloadAction<any>) => {
      return { ...state, rolesList: action.payload };
    },
    setSelectedAdmin: (state, action: PayloadAction<any>) => {
      return { ...state, selectedAdmin: action.payload };
    },
    setAdminDetail: (state, action: PayloadAction<any>) => {
      return { ...state, adminDataDetail: action.payload };
    },
  },
});

export const {
  setAdminData,
  setAdminList,
  setAdminActivity,
  setAdminPermissionsList,
  setRoleList,
  setSelectedAdmin,
  setAdminDetail,
} = adminSlice.actions;

export const selectAdmin = (state: { admin: AdminStateSlice }) => state.admin;
export const selectAdminData = (state: { admin: AdminStateSlice }) =>
  state.admin.data;
export const selectAdminList = (state: { admin: AdminStateSlice }) =>
  state.admin.list;
export const selectAdminActivity = (state: { admin: AdminStateSlice }) =>
  state.admin.activity;
export const selectAdminPermissionsList = (state: { admin: AdminStateSlice }) =>
  state.admin.adminPermissionsList;
export default adminSlice.reducer;
