import React from 'react';

type Props = {
  enableBackground: boolean;
};

const StepLine = ({ enableBackground }: Props) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className={`h-full w-[1px] ${enableBackground ? 'bg-primary' : 'bg-borderLightGray'}`}></div>
    </div>
  );
};

export default StepLine;
