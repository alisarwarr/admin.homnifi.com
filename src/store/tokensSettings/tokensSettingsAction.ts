//UTILS
import { errorAlert, successAlert } from '../../utils/alerts';
import {
  WALLET_ADMIN_DEPOSITS,
  WALLET_ADMIN_SWAPS,
  WALLET_ADMIN_NETWORKS,
  WALLET_ADMIN_ALL_TOKENS
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
import { setAllTokens, setDepositSettings, setNetworkSettings, setSwapSettings } from './tokensSettingsSlice';
import { useDispatch } from 'react-redux';

export const useTokensSettingsAction = () => {
  const dispatch = useDispatch();

  const getDepositSettings = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${WALLET_ADMIN_DEPOSITS}`,
      })
      .then((response: any) => {
        dispatch(setDepositSettings(response.data.data));
        return response;
      })
      .catch((error: any) => error);
  };
  const getSwapSettings = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${WALLET_ADMIN_SWAPS}`
      })
      .then((response: any) => {
        dispatch(setSwapSettings(response.data.data));
        return response;
      })
      .catch((error: any) => error);
  };
  const getNetworkSettings = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: WALLET_ADMIN_NETWORKS
      })
      .then((response: any) => {
        dispatch(setNetworkSettings(response.data.data));
        return response;
      })
      .catch((error: any) => error);
  };

  const addDespositSettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: WALLET_ADMIN_DEPOSITS,
        data,
      })
      .then((response: any) => {
        successAlert(response.data.message);
      })
      .catch((error: any) => {
        errorAlert(error.data.message || "Something went wrong");
      });
  };
  const addSwapSettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: WALLET_ADMIN_SWAPS,
        data,
      })
      .then((response: any) => {
        successAlert(response.data.message);
      })
      .catch((error: any) => {
        errorAlert(error.data.message || "Something went wrong");
      });
  };
  const addNetworkSettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: WALLET_ADMIN_NETWORKS,
        data,
      })
      .then((response: any) => {
        successAlert(response.data.message);
      })
      .catch((error: any) => {
        errorAlert(error.data.message || "Something went wrong");
      });
  };

  const updateDespositSettings = async ({ id, data }: { id: string; data: any }) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: WALLET_ADMIN_DEPOSITS + id,
        data,
      })
      .then((response: any) => {
        successAlert(response.data.message);
      })
      .catch((error: any) => {
        errorAlert(error.data.message || "Something went wrong");
      });
  };
  const updateSwapSettings = async ({ id, data }: { id: string; data: any }) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: WALLET_ADMIN_SWAPS + id,
        data,
      })
      .then((response: any) => {
        successAlert(response.data.message);
      })
      .catch((error: any) => {
        errorAlert(error.data.message || "Something went wrong");
      });
  };
  const updateNetworkSettings = async ({ id, data }: { id: string; data: any }) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: WALLET_ADMIN_NETWORKS + id,
        data,
      })
      .then((response: any) => {
        successAlert(response.data.message);
      })
      .catch((error: any) => {
        errorAlert(error.data.message || "Something went wrong");
      });
  };

  const getAllTokens = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: WALLET_ADMIN_ALL_TOKENS
      })
      .then((response: any) => {
        dispatch(setAllTokens(response.data.data));
        return response;
      })
      .catch((error: any) => error);
  };

  return {
    getDepositSettings,
    getSwapSettings,
    getNetworkSettings,
    ///////////////////
    addDespositSettings,
    addSwapSettings,
    addNetworkSettings,
    ///////////////////
    updateDespositSettings,
    updateSwapSettings,
    updateNetworkSettings,
    ///////////////////
    getAllTokens
  };
};