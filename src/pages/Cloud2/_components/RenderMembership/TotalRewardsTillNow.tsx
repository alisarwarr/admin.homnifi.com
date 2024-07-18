import React from 'react';
import { ClaimableIcon, GASKIcon } from '../../../../images/svg';

const TotalRewardsTillNow = () => {
  return (
    <article className="md:w-2/5 w-full flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 font-medium">
          Total Rewards Till Now
          <hr />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <div className="flex gap-4 items-center">
            <ClaimableIcon />
            <div className="text-primary text-2xl font-medium">$ 0</div>
          </div>
          <div className="flex gap-4 items-center">
            <GASKIcon />
            <div className="text-primaryDark text-2xl font-medium">
              <>
                0<span className="text-sm"> sLYK</span>
              </>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-wrap">
        <div className="flex flex-col gap-2 font-medium">
          Claimable Rewards
          <hr />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <div className="flex gap-4 items-center">
            <ClaimableIcon />
            <div className="text-primary text-2xl font-medium">$ 0</div>
          </div>
          <div className="flex gap-4 items-center">
            <GASKIcon />
            <div className="text-primaryDark text-2xl font-medium">
              <>
                0<span className="text-sm"> sLYK</span>
              </>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TotalRewardsTillNow;
