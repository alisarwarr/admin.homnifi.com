import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import '../../styles/index.css';

type GlobalSwitchProps = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const GlobalSwitch: React.FC<GlobalSwitchProps> = ({ checked, onChange, disabled }) => {
  return <Toggle  defaultChecked={checked} icons={false} size={20} onChange={onChange} />;
};

export default GlobalSwitch;
