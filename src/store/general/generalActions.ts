import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import axios, { AxiosRequestConfig } from 'axios';
import { setConvertedPrice, setMaintenance } from './generalSlice';
import ApiRequest from '../../utils/network/ApiRequest';
import { useNavigate } from 'react-router-dom';

export const useGeneralActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const GetConvertedPrice = async () => {
    return await axios
      .request({
        method: 'GET',
        url: `https://openapi.koinbay.com/sapi/v1/ticker?symbol=CLFIUSDT`,
      })
      .then((response: any) => {
        dispatch(setConvertedPrice(response.data.buy));

        return response;
      })
      .catch((error: any) => error);
  };

  return {
    GetConvertedPrice,
  };
};
