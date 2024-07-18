import { useDispatch, useSelector } from 'react-redux';
//API
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import axios, { AxiosRequestConfig } from 'axios';
import { setConvertedPrice, setMaintenance } from './generalSlice';
import ApiRequest from '../../utils/network/ApiRequest';

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
        // dispatch(
        //   rewardsSliceAction.setRewardSlice({
        //     LYK: response.data.buy,
        //   })
        // );
        // dispatch(rewardsSliceAction.initRewardCalculator());

        return response;
      })
      .catch((error: any) => error);
  };

  return {
    GetConvertedPrice,
  };
};
