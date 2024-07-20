import { useDispatch } from 'react-redux';
import ApiRequest from '../../utils/network/ApiRequest';
import {
  CLOUDK_MACHINE_SIMULATION,
  USER_MACHINE_LIST,
  USER_MACHINE_REWARDS,
  USER_MACHINE_DETAILS,
  INFLATION_RULES,
  CRON_JOBS_LIST,
  SIMULATION_MACHINE_LIST,
} from '../../utils/network/ApiEndpoints';
import { cloudkSliceAction } from './cloudk.slice';
import { simulationSliceAction } from './simulation';

import { toast } from 'react-toastify';
import { store } from '..';

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
      dispatch(
        cloudkSliceAction.setCloudkSlice({ infalationRules: _infalationRules })
      );
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
        url: INFLATION_RULES,
      });
      console.log(response, 'responseresponseresponse');

      const _infalationRules = response?.data?.data;
      console.log(
        '🚀 ~ getCurrentInfalationRules ~ _infalationRules:',
        _infalationRules
      );
      dispatch(
        cloudkSliceAction.setCloudkSlice({
          currentinfalationRules: _infalationRules,
        })
      );
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
        url: INFLATION_RULES,
        data,
      });

      await getCurrentInfalationRules();

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
              lifetimeReward:
                response.data.data.lifetimeRewardPrice * convertedPrice,
              claimableRewards:
                response.data.data.claimableRewardsPrice * convertedPrice,
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

  const getUserMachineRewards = async () => {
    dispatch(
      cloudkSliceAction.setCloudkSlice({
        getUserMachineRewardsLoading: true,
      })
    );
    return await ApiRequest()
      .request({
        method: 'GET',
        url: USER_MACHINE_REWARDS,
      })
      .then((response) => {
        console.log({ response });
        dispatch(cloudkSliceAction.setCloudkSlice(response.data.data));
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            getUserMachineRewardsLoading: false,
          })
        );

        return response;
      })
      .catch((error) => {
        toast.error(error.data.message);
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            getUserMachineRewardsLoading: false,
          })
        );

        return error;
      });
  };

  const startSimulation = async (data: any) => {
    dispatch(
      simulationSliceAction.setSimulationSlice({ startSimulationLoading: true })
    );
    return await ApiRequest()
      .request({
        method: 'POST',
        url: CLOUDK_MACHINE_SIMULATION,
        data,
      })
      .then((response: any) => {
        console.log('🚀 ~ .then ~ response:', response);
        // dispatch(cloudkSliceAction.setUserMachineList(response.data.data));
        dispatch(
          simulationSliceAction.setSimulationSlice({
            simulationData: response.data.data,
          })
        );
        dispatch(
          simulationSliceAction.setSimulationSlice({
            startSimulationLoading: false,
          })
        );
        dispatch(
          simulationSliceAction.selectChart({ startSimulationLoading: false })
        );

        return response;
      })
      .catch((error: any) => {
        dispatch(
          simulationSliceAction.setSimulationSlice({
            startSimulationLoading: false,
          })
        );
        toast.error(error.data.message);
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userMachinesLoading: false,
          })
        );

        return error;
      });
  };

  const getMachineDetails = async (id: string) => {
    dispatch(
      cloudkSliceAction.setCloudkSlice({
        getMachineDetailsLoading: true,
      })
    );

    return await ApiRequest()
      .request({
        method: 'GET',
        url: USER_MACHINE_DETAILS + id,
      })
      .then((response) => {
        const machine = store
          .getState()
          .cloudk.userMachineList?.map((_machine) =>
            _machine._id === id
              ? {
                  ..._machine,
                  ...response.data.data,
                }
              : _machine
          );

        dispatch(
          cloudkSliceAction.setCloudkSlice({
            getMachineDetailsLoading: false,
            userMachineList: machine,
          })
        );

        return response;
      })
      .catch((error) => {
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            getMachineDetailsLoading: false,
          })
        );

        toast.error(error.data.message);

        return error;
      });
  };

  const getUserMachineList = async ({
    search,
    limit,
    page,
  }: {
    search?: string;
    limit?: number;
    page?: number;
  }) => {
    // userMachinesLoading
    dispatch(
      cloudkSliceAction.setCloudkSlice({
        userMachinesLoading: true,
      })
    );
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${USER_MACHINE_LIST}?search=${search}&limit=${limit}&page=${page}`,
      })
      .then((response: any) => {
        dispatch(cloudkSliceAction.setUserMachineList(response.data.data.list));
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userMachinesLoading: false,
          })
        );

        return response;
      })
      .catch((error: any) => {
        toast.error(error.data.message);
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userMachinesLoading: false,
          })
        );

        return error;
      });
  };
  const getUserSimulationList = async ({
    search,
    limit,
    page,
  }: {
    search?: string;
    limit?: number;
    page?: number;
  }) => {
    // userMachinesLoading
    dispatch(
      cloudkSliceAction.setCloudkSlice({
        userMachinesLoading: true,
      })
    );
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${SIMULATION_MACHINE_LIST}?search=${search}&limit=${limit}&page=${page}`,
      })
      .then((response: any) => {
        dispatch(
          cloudkSliceAction.setSimulationMachineList(response.data.data.list)
        );
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userMachinesLoading: false,
          })
        );

        return response;
      })
      .catch((error: any) => {
        toast.error(error.data.message);
        dispatch(
          cloudkSliceAction.setCloudkSlice({
            userMachinesLoading: false,
          })
        );

        return error;
      });
  };
  return {
    getInfalationRules,
    createInfalationRules,
    getCurrentInfalationRules,
    getUserMachinesList,
    getUserMachineList,
    startSimulation,
    getUserRewardsData,
    getMachineDetails,
    getUserMachineRewards,
    getUserSimulationList,
  };
};
