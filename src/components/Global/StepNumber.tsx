import React from 'react';

type Props = {
  number: number;
  enableBackground: boolean;
  active: boolean;
};

const StepNumber = ({ number, enableBackground, active }: Props) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`text-xs flex items-center justify-center w-6 h-6 ${active && `border-primary text-primary`} ${
          enableBackground
            ? `bg-primary text-white border border-primary`
            : `bg-white text-borderGray border border-borderGray`
        }  rounded-stepperShape -start-4  ring-white  `}
      >
        <span>{number}</span>
      </div>
    </div>
  );
};

export default StepNumber;
