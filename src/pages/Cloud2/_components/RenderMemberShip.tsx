import RewardsTillNow from './RenderMembership/RewardsTillNow';
import RenderMachinesHistory from './RenderMembership/RenderMachinesHistory';
import React, { useEffect } from 'react';
import { useCloudActions } from '../../../store/cloudk/cloudk.action';

type Props = {
  isRenderReward?: boolean;
};

const RenderMemberShip = ({ isRenderReward = true }: Props) => {
  const { getUserMachineRewards } = useCloudActions();

  useEffect(() => {
    getUserMachineRewards();
  }, []);

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
