import React, { useState } from 'react';
import GlobalButton from '../../../../components/Global/GlobalButton';
import { ClaimableIcon, GASKIcon, InfoIcon } from '../../../../images/svg';
import CustomSwitch from '../../../../components/Global/GlobalSwitch';
// import Toottip from '../../../../components/Global/Toottip';
import { useNavigate } from 'react-router-dom';
import Toottip from '../../../../components/Global/Toottip';

type Props = {};

const TotalRewardsTillNow = (props: Props) => {
  const [autoCompounding, setAutoCompounding] = useState<boolean>(false);
  const navigate = useNavigate();

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
            <div className="text-primary text-2xl font-medium">8,023,586</div>
          </div>
          <div className="flex gap-4 items-center">
            <GASKIcon />
            <div className="text-primaryDark text-2xl font-medium">8,023,586 LYK</div>
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
            <div className="text-primary text-2xl font-medium">8,023,586</div>
          </div>
          <div className="flex gap-4 items-center">
            <GASKIcon />
            <div className="text-primaryDark text-2xl font-medium">8,023,586 LYK</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TotalRewardsTillNow;
