import React from 'react';
import '../../styles/index.css';

const GlobalCheckbox = ({
  label,
  checked,
  setChecked,
  onChange,
  className,
}: {
  label?: string;
  checked: boolean;
  setChecked: (e: boolean) => void;
  onChange?: any;
  className?: string;
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(!checked);
          onChange && onChange(e);
        }}
        className={`custom-checkbox`}
      />
      {label && (
        <span className="text-xs text-primaryGrey cursor-pointer" onClick={() => setChecked(!checked)}>
          {label}
        </span>
      )}
      ;
    </div>
  );
};

export default GlobalCheckbox;
