import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import RenderMemberShip from '../_components/RenderMemberShip';
import RewardsTillNow from '../_components/RenderMembership/RewardsTillNow';
import RenderMachinesHistory from '../_components/RenderMembership/RenderMachinesHistory';

const MachineList = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full flex flex-col gap-4">
      <RewardsTillNow />
      <RenderMachinesHistory />
    </div>
  );
};

export default MachineList;
