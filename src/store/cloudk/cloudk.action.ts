import { useDispatch } from 'react-redux';
import ApiRequest from '../../utils/network/ApiRequest';
import { INFLATION_RULES, PRODUCTS, USER_MACHINE_LIST } from '../../utils/network/ApiEndpoints';
import { cloudkSliceAction } from './cloudk.slice';

export const useCloudActions = () => {
  const dispatch = useDispatch();
  const convertedPrice = 0;

  const getInfalationRules = async () => {
    try {
      const response = await ApiRequest().request({
        method: 'GET',
        url: `${INFLATION_RULES}/history`,
      });
      const _infalationRules = response?.data?.data;
      dispatch(cloudkSliceAction.setCloudkSlice({ infalationRules: _infalationRules }));
      return response;
    } catch (error) {
      console.error('Error fetching inflation rules history:', error);
      return error;
    }
  };

  const getCurrentInfalationRules = async () => {
    try {
      const response = await ApiRequest().request({
        method: 'GET',
        url: `${INFLATION_RULES}`,
      });
      console.log(response, 'responseresponseresponse');

      const _infalationRules = response?.data?.data;
      console.log('🚀 ~ getCurrentInfalationRules ~ _infalationRules:', _infalationRules);
      dispatch(cloudkSliceAction.setCloudkSlice({ currentinfalationRules: _infalationRules }));
      return response;
    } catch (error) {
      console.error('Error fetching current inflation rules:', error);
      return error;
    }
  };

  const createInfalationRules = async (data) => {
    try {
      const response = await ApiRequest().request({
        method: 'POST',
        url: `${INFLATION_RULES}`,
        data,
      });

      console.log('response', response);

      await getCurrentInfalationRules();
      const _infalationRules = response?.data?.data;
      return response;
    } catch (error) {
      console.error('Error creating inflation rules:', error);
      return error;
    }
  };

  const getUserMachinesList = async () => {
    dispatch(
      cloudkSliceAction.setCloudkSlice({
        userMachinesLoading: true,
      })
    );

    return await ApiRequest()
      .request({
        method: 'GET',
        url: 'USER_MACHINES',
      })
      .then((response: any) => {
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            machineList: [...response.data.data],
          })
        );

        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userMachinesLoading: false,
          })
        );

        return response;
      })
      .catch((error: any) => {
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userMachinesLoading: false,
          })
        );

        // toast.error(error.data);

        return error;
      });
  };

  const getUserRewardsData = async () => {
    dispatch(
      cloudkSliceAction.setCloudkSlice({
        userRewardsLoading: true,
      })
    );

    return await ApiRequest()
      .request({
        method: 'GET',
        url: 'USER_REWARDS',
      })
      .then((response: any) => {
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userRewards: {
              ...response.data.data,
              lifetimeReward: response.data.data.lifetimeRewardPrice * convertedPrice,
              claimableRewards: response.data.data.claimableRewardsPrice * convertedPrice,
            },
            userRewardsLoading: false,
          })
        );

        return response;
      })
      .catch((error: any) => {
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userRewardsLoading: false,
          })
        );

        // toast.error(error.data);

        return error;
      });
  };


  const getUserMachineList = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: USER_MACHINE_LIST,
      })
      .then((response: any) => {
        dispatch(cloudkSliceAction.setUserMachineList(response.data.data));
        return response;
      })
      .catch((error: any) => error);
  }


  return {
    getInfalationRules,
    createInfalationRules,
    getCurrentInfalationRules,
    getUserMachinesList,
    getUserMachineList
  };
};
