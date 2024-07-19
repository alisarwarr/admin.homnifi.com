import RewardsTillNow from './RenderMembership/RewardsTillNow';
import RenderMachinesHistory from './RenderMembership/RenderMachinesHistory';
import React from 'react';

const RenderMemberShip = () => {
  return (
    <div>
      <div className="w-full flex gap-4">
        <RewardsTillNow />
      </div>

      <RenderMachinesHistory />
    </div>
  );
};

export default RenderMemberShip;
