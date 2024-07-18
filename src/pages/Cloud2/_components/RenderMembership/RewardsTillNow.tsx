import React from 'react';

import TotalRewardsTillNow from './TotalRewardsTillNow';
import Slyk from './SLYK';

const RewardsTillNow = () => {
  return (
    <section className="bg-white border border-borderLightGray rounded-lg shadow p-6 w-full flex gap-3 justify-between flex-wrap h-full items-center">
      <TotalRewardsTillNow />

      <Slyk />
    </section>
  );
};

export default RewardsTillNow;
