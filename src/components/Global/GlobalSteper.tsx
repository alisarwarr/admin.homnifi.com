import React from 'react';
import { useSelector } from 'react-redux';
import StepNumber from './StepNumber';
import StepLine from './StepLine';

type Props = {
  step: number;
  enableBackground: any;
  lineEnable?: boolean;
};

const GlobalStepper = ({
  step,
  enableBackground = null,
  lineEnable = true,
}: Props) => {
  return (
    <div className="h-full transition-all">
      <StepNumber
        number={step}
        enableBackground={enableBackground}
        active={true}
      />
      {lineEnable && <StepLine enableBackground={enableBackground} />}
    </div>
  );
};

export default GlobalStepper;
