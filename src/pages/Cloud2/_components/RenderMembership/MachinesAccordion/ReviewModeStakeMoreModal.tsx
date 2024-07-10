import React from 'react';
import GaugeChart from '../../../../../components/Cloud/Test1Chart';
import { ArrowDownCircleOutlined } from '../../../../../images/svgs';


const ReviewModeStakeMoreModal = () => {
  return (
    <article className="flex flex-col gap-2 w-full">
      <article className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-cardSecondaryText">Staking Amount</span>
          <span className="text-lg font-bold text-primary">$ 18,000.00</span>
        </div>

        <div className="flex items-center gap-2 relative justify-center">
          <GaugeChart
            containerWidth={150}
            containerHeight={100}
            strokeWidth={2}
          />

          <div className="flex flex-col font-bold text-primaryDark absolute bottom-4 text-center">
            <span className="text-sm font-semibold">$ 25,000</span>
            <span className="text-xs">mLYK</span>
          </div>
        </div>
      </article>

      <div className="w-[150px] flex items-center justify-center self-end">
        <ArrowDownCircleOutlined />
      </div>

      <article className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-cardSecondaryText">New Staked Amount</span>
          <span className="text-lg font-bold text-primary">$ 20,230.00</span>
        </div>

        <div className="flex items-center gap-2 relative justify-center">
          <GaugeChart
            containerWidth={150}
            containerHeight={100}
            strokeWidth={2}
          />

          <div className="flex flex-col font-bold text-primaryDark absolute bottom-4 text-center">
            <span className="text-sm font-semibold">$ 40,000</span>
            <span className="text-xs">mLYK</span>
          </div>
        </div>
      </article>
    </article>
  );
};

export default ReviewModeStakeMoreModal;
