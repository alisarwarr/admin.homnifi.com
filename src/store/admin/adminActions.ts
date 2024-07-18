import { useDispatch } from 'react-redux';
import {
  ADMIN_ACCESS,
  ADMIN_ACTIVITY,
  ADMIN_CHECK_EMAIL,
  ADMIN_CHECK_USERNAME,
  ADMIN_CREATE,
  ADMIN_INFO,
  ADMIN_LIST,
  ADMIN_PERMISSIONS,
  ADMIN_UPDATE,
  CREATE_ADMIN_ROLES,
  GET_ADDMIN_ROLES,
  CREATE_ADMIN,
  UPDATE_ADMIN_PERMISSION,
  DELETE_ADMIN,
  UPDATE_ADMIN,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
import {
  setAdminActivity,
  setAdminData,
  setAdminList,
  setAdminPermissionsList,
  setRoleList,
  setAdminDetail,
} from './adminSlice';

export const useAdminActions = () => {
  const dispatch = useDispatch();

  const getAdminData = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_INFO,
      })
      .then((response: any) => {
        dispatch(setAdminData(response.data.data));
        return response.data;
      })
      .catch((err: any) => err.data);
  };

  const createAdminData = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: ADMIN_CREATE,
        data,
      })
      .then((response: any) => response.data.data)
      .catch((err: any) => err.data);
  };

  const updateAdminData = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: ADMIN_UPDATE,
        data,
      })
      .then((response: any) => response.data)
      .catch((err: any) => err.data);
  };

  const checkAdminEmail = async (email: string) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_CHECK_EMAIL + '/' + email,
      })
      .then((response: any) => response.data.data)
      .catch((err: any) => err.data);
  };

  const checkAdminUsername = async (username: string) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_CHECK_USERNAME + '/' + username,
      })
      .then((response: any) => response.data.data)
      .catch((err: any) => err.data);
  };

  const getAdminPermissionsList = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_PERMISSIONS,
      })
      .then((response: any) => {
        dispatch(setAdminPermissionsList(response?.data?.data));
        return response?.data;
      })
      .catch((err: any) => err.data);
  };

  const updateAdminAccess = async (id: string, status: string) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: ADMIN_ACCESS + '/' + id,
        data: { status },
      })
      .then((response: any) => response.data)
      .catch((err: any) => err.data);
  };

  const getAdminActivity = async (params) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_ACTIVITY,
        params,
      })
      .then((response: any) => {
        dispatch(setAdminActivity(response.data.data));
        return response.data;
      })
      .catch((err: any) => err.data);
  };

  const getAdminList = async (page: number = 1, limit: number = 10) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${ADMIN_LIST}?page=${page}&limit=${limit}`,
      })
      .then((response: any) => {
        dispatch(setAdminDetail(response?.data?.data));
        dispatch(setAdminList(response?.data?.data.paginatedResults));
        return response;
      })
      .catch((err: any) => err.data);
  };

  const createAdminRole = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: CREATE_ADMIN_ROLES,
        data,
      })
      .then((response: any) => {
        console.log('create Admin role response :::', response.data);
        getAdminRole();
        return response.data;
      })
      .catch((err: any) => err.data);
  };

  const getAdminRole = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: GET_ADDMIN_ROLES,
      })
      .then((response: any) => {
        console.log('response role list ::', response.data);
        dispatch(setRoleList(response?.data?.data));
        return response;
      })
      .catch((err: any) => err.data);
  };

  const createAdmin = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: CREATE_ADMIN,
        data,
      })
      .then((response: any) => {
        getAdminList();
        return response;
      })
      .catch((err: any) => err.data);
  };

  const getAdminById = async (id: string) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${ADMIN_LIST}/${id}`,
      })
      .then((response: any) => {
        console.log('get Admin by id ::', response.data);
        // dispatch(setSelectedAdmin(response?.data));

        return response;
      })
      .catch((err: any) => err.data);
  };

  const updateAdminPermisson = async (id: string, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${UPDATE_ADMIN_PERMISSION}?id=${id}`,
        data,
      })
      .then((response: any) => {
        console.log('create Admin role response :::', response.data);
        getAdminRole();
        return response.data;
      })
      .catch((err: any) => err.data);
  };

  const deleteAdmin = async (id: string) => {
    return await ApiRequest()
      .request({
        method: 'DELETE',
        url: `${DELETE_ADMIN}/${id}`,
      })
      .then((response: any) => {
        getAdminList();
        return response;
      })
      .catch((err: any) => err.data);
  };

  const updateAdmin = async (id: string, data: any) => {
    delete data.password;
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${UPDATE_ADMIN}/${id}`,
        data,
      })
      .then((response: any) => {
        getAdminList();
        return response;
      })
      .catch((err: any) => err.data);
  };
  return {
    getAdminData,
    createAdminData,
    updateAdminData,
    checkAdminEmail,
    checkAdminUsername,
    getAdminList,
    updateAdminAccess,
    getAdminActivity,
    getAdminPermissionsList,
    createAdminRole,
    getAdminRole,
    createAdmin,
    getAdminById,
    updateAdminPermisson,
    deleteAdmin,
    updateAdmin,
  };
};
