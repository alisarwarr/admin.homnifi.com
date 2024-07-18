//UTILS
import {
  WALLET_ADMIN_DEPOSITS,
  WALLET_ADMIN_SWAPS,
  WALLET_ADMIN_NETWORKS,
  WALLET_ADMIN_NETWORKS_NEW,
  WALLET_ADMIN_SWAPS_NEW,
  WALLET_ADMIN_DEPOSITS_NEW,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
import { setDepositSettings, setNetworkSettings, setSwapSettings } from './tokensSettingsSlice';
import { useDispatch } from 'react-redux';

export const useTokensSettingsAction = () => {
  const dispatch = useDispatch();

  const getDepositSettings = async ({ page, limit }: { page: number; limit: number }) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${WALLET_ADMIN_DEPOSITS}?page=${page}&limit=${limit}`,
      })
      .then((response: any) => {
        dispatch(setDepositSettings(response.data.data));
        return response;
      })
      .catch((error: any) => error);
  };
  const getSwapSettings = async ({ page, limit }: { page: number; limit: number }) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${WALLET_ADMIN_SWAPS}?page=${page}&limit=${limit}`,
      })
      .then((response: any) => {
        dispatch(setSwapSettings(response.data.data));
        return response;
      })
      .catch((error: any) => error);
  };
  const getNetworkSettings = async ({ page, limit }: { page: number; limit: number }) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${WALLET_ADMIN_NETWORKS}?page=${page}&limit=${limit}`,
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
        url: WALLET_ADMIN_DEPOSITS_NEW,
        data,
      })
      .then((response: any) => response)
      .catch((error: any) => error);
  };
  const addSwapSettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: WALLET_ADMIN_SWAPS_NEW,
        data,
      })
      .then((response: any) => response)
      .catch((error: any) => error);
  };
  const addNetworkSettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: WALLET_ADMIN_NETWORKS_NEW,
        data,
      })
      .then((response: any) => response)
      .catch((error: any) => error);
  };

  return {
    getDepositSettings,
    getSwapSettings,
    getNetworkSettings,
    ///////////////////
    addDespositSettings,
    addSwapSettings,
    addNetworkSettings
  };
};
