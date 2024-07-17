import { useDispatch } from 'react-redux';
import ApiRequest from '../../utils/network/ApiRequest';
import { INFLATION_RULES } from '../../utils/network/ApiEndpoints';
import { cloudkSliceAction, selectCloudkSlice } from './cloudk.slice';

export const    useCloudActions = () => {
  const dispatch = useDispatch();

  const getInfalationRules = async () => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${INFLATION_RULES}/history`,
    });
    const _infalationRules = response?.data?.data;
    dispatch(cloudkSliceAction.setCloudkSlice({infalationRules: _infalationRules}));
  };

  const createInfalationRules = async (data : any) => {
    const response = await ApiRequest().request({
      method: 'POST',
      url: `${INFLATION_RULES}`,
      data
    });
    const _infalationRules = response?.data?.data;
    dispatch(cloudkSliceAction.setCloudkSlice({infalationRules: _infalationRules}));
  };

  return {
    getInfalationRules,
  };
};
