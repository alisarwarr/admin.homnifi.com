import React from 'react';
import RewardsTillNow from '../_components/RenderMembership/RewardsTillNow';
import RenderMachinesHistory from '../_components/RenderMembership/RenderMachinesHistory';

const MachineList = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <RewardsTillNow />
      <RenderMachinesHistory />
    </div>
  );
};

export default MachineList;
