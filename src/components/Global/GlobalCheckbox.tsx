import React from 'react';
import '../../styles/index.css';

const GlobalCheckbox = ({
  label,
  checked,
  setChecked,
  className,
}: {
  label?: string;
  checked: boolean;
  setChecked: (e: boolean) => void;
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 select-none `}>
      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className={`custom-checkbox`} />
      {label && (
        <span className={`text-xs text-primaryGrey cursor-pointer ${className}`} onClick={() => setChecked(!checked)}>
          {label}
        </span>
      )}
    </div>
  );
};

export default GlobalCheckbox;
