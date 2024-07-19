import React from 'react';
import PurchaseCalculator from './PurchaseCalculator';
import IntroductionToStaking from './IntroductionToStaking';
import MachineComparision from './MachineComparision';
import EstimatedRewards from './EstimatedRewards';
import BenefitsSection from './BenefitsSection';
import { Alert } from '@mui/material';
import { dangerYellow } from '../../../images/others';

type Props = {};

const RenderCloudMain = (props: Props) => {
  return (
    <article className="grid grid-cols-2 gap-5">
      <PurchaseCalculator />

      <IntroductionToStaking />

      <MachineComparision />

      <EstimatedRewards />

      <BenefitsSection />

      <Alert
        severity="warning"
        icon={<img src={dangerYellow} alt="dangerYellow" />}
        className="col-span-2"
        sx={{
          '& .MuiAlert-message': {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        }}
      >
        <div className="w-full flex items-center justify-between flex-col md:flex-row space-y-2 md:space-y-0">
          <div className="md:flex md:items-center md:space-x-2.5 text-alertBrown">
            The rewards you receive depend on the LYK price and whether the auto-compound feature is turned on.
          </div>
        </div>
      </Alert>
    </article>
  );
};

export default RenderCloudMain;
