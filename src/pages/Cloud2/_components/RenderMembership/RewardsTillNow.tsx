import React, { useEffect } from 'react';

import TotalRewardsTillNow from './TotalRewardsTillNow';
import Slyk from './SLYK';
import { useCloudActions } from '../../../../store/cloudk/cloudk.action';
import { useGeneralActions } from '../../../../store/general/generalActions';

const RewardsTillNow = () => {
  const { getUserMachineRewards } = useCloudActions();
  const { GetConvertedPrice } = useGeneralActions();

  const fetchUserMachineRecords = async () => {
    await getUserMachineRewards();
  };

  const fetchConversionRate = async () => {
    try {
      await GetConvertedPrice();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchUserMachineRecords();
    fetchConversionRate();
  }, []);

  return (
    <section className="bg-white border border-borderLightGray rounded-lg shadow p-6 w-full flex gap-3 justify-between flex-wrap h-full items-center">
      <TotalRewardsTillNow />

      <Slyk />
    </section>
  );
};

export default RewardsTillNow;
