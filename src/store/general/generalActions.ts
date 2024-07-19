import { useDispatch } from 'react-redux';

import axios from 'axios';
import { setConvertedPrice } from './generalSlice';

export const useGeneralActions = () => {
  const dispatch = useDispatch();

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
