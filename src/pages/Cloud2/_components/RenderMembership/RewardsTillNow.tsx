import React from 'react';

import TotalRewardsTillNow from './TotalRewardsTillNow';
import SLYK from './SLYK';

type Props = {};

const RewardsTillNow = (props: Props) => {
  return (
    <section className="bg-white border border-borderLightGray rounded-lg shadow p-6 w-full flex gap-5 justify-between flex-wrap">
      <TotalRewardsTillNow />

      <SLYK />
    </section>
  );
};

export default RewardsTillNow;
