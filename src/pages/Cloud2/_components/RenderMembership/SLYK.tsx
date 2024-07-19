import React, { useState } from 'react';
import { ClaimableIcon, GASKIcon } from '../../../../images/svg';
import CustomSwitch from '../../../../components/Global/GlobalSwitch';
import GlobalButton from '../../../../components/Global/GlobalButton';
import { useNavigate } from 'react-router-dom';

type Props = {};

const SLYK = (props: Props) => {
  const [slykStates, setSlykStates] = useState({
    autoCompounding: false,
  });

  const navigate = useNavigate();

  return (
    <article className="md:w-2/5 w-full flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-col">
          <p className="text-cardSecondaryText text-lg border-b border-borderLightGray">Total Staked sLYK</p>
          <div className="text-primaryDark text-2xl font-medium flex gap-2">
            <GASKIcon />
            <p>8,023,586 sLYK</p>
          </div>
        </div>

        <div className="flex justify-between flex-col gap-2 flex-wrap">
          <div className="flex gap-4 flex-col">
            <p className="text-cardSecondaryText text-lg border-b border-borderLightGray">Available sLYK to deposit</p>
            <div className="text-primary text-2xl font-medium flex gap-2">
              <ClaimableIcon />
              <p>8,023,586</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <GlobalButton
            text="Purchase Calculator"
            classNames="!rounded-lg font-normal tracking-wide !px-6 !w-max"
            onClick={() => navigate('/defi-360/cloudk2')}
          />

          <GlobalButton
            text="Rewards Calculator"
            type="button"
            classNames="!rounded-lg font-normal tracking-wide !px-6 !w-max"
            onClick={() => navigate('/defi-360/cloudk2/rewards-calculator')}
          />
        </div>
      </div>
    </article>
  );
};

export default SLYK;
