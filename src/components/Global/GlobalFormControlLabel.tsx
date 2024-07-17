import React from 'react';

type GlobalFormControlLabelProps = {
  control: React.ReactElement;
  label: string;
  className?: string;
};

const GlobalFormControlLabel: React.FC<GlobalFormControlLabelProps> = ({ control, label, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {control}
      <span className="ml-2 text-gray-700 text-sm">{label}</span>
    </div>
  );
};

export default GlobalFormControlLabel;
