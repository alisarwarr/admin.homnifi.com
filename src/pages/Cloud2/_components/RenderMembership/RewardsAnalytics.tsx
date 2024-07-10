import React from 'react';
import LineChart from '../../../../components/Cloud/LineChart';

type Props = {};

const RewardsAnalytics = (props: Props) => {
  return (
    <div className="w-3/5 bg-white border border-borderLightGray rounded-lg shadow p-6">
      <div className="flex flex-col gap-2 font-medium">
        Rewards Analytics
        <hr />
      </div>
      <div className="w-full">
        <LineChart />
      </div>
    </div>
  );
};

export default RewardsAnalytics;
