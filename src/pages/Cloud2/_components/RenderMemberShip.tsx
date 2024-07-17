import RewardHistory from '../../../components/Cloud/RewardHistory';
import RewardsTillNow from './RenderMembership/RewardsTillNow';
import RenderMachinesHistory from './RenderMembership/RenderMachinesHistory';
import React from 'react';

type Props = {
  isRenderReward?: boolean;
};

const RenderMemberShip = ({ isRenderReward = true }: Props) => {
  return (
    <div>
      {isRenderReward && (
        <div className="w-full flex gap-4">
          <RewardsTillNow />
        </div>
      )}

      <RenderMachinesHistory />
    </div>
  );
};

export default RenderMemberShip;
