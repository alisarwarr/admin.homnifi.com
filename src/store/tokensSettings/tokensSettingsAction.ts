//UTILS
import {} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
import { setDepositSettings, setNetworkSettings, setSwapSettings } from './tokensSettingsSlice';
import { useDispatch } from 'react-redux';


export const useTokensSettingsAction = () => {
  const dispatch = useDispatch();


  const getDepositSettings = async () => {
    return await ApiRequest()
    .request({
      method: 'GET',
      url: '',
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
      url: '',
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
      url: '',
    })
    .then((response: any) => {
      dispatch(setNetworkSettings(response.data.data));
      return response;
    })
    .catch((error: any) => error);
  };


  const addDepositSettings = async () => {
    return await ApiRequest()
    .request({
      method: 'GET',
      url: '',
    })
    .then((response: any) => response
  )
    .catch((error: any) => error);
  };
  const addSwapSettings = async () => {
    return await ApiRequest()
    .request({
      method: 'GET',
      url: '',
    })
    .then((response: any) => response)
    .catch((error: any) => error);
  };
  const addNetworkSettings = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: '',
      })
      .then((response: any) => response)
      .catch((error: any) => error);
  };


  return {
    getDepositSettings,
    getSwapSettings,
    getNetworkSettings,

    addDepositSettings,
    addSwapSettings,
    addNetworkSettings,
  }
}