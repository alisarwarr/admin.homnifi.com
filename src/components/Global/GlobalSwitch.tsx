import React, { ChangeEvent, useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // for ES6 modules

import '../../styles/index.css';

interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPasitionLeft?: boolean;
}

const GlobalSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange, label, labelPasitionLeft = true }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const handleLabelClick = () => {
    onChange(!checked);
  };

  return (
    <div className="flex items-center gap-8">
      {labelPasitionLeft && label && (
        <span className="text-sm text-gray-700 cursor-pointer" onClick={handleLabelClick}>
          {label}
        </span>
      )}

      <Toggle checked={checked} icons={false} size={20} onChange={handleChange} />

      {!labelPasitionLeft && label && (
        <span className="text-sm text-gray-700 cursor-pointer" onClick={handleLabelClick}>
          {label}
        </span>
      )}
    </div>
  );
};

export default GlobalSwitch;
