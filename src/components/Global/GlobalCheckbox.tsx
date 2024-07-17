import React from 'react';

const GlobalCheckbox = ({
  label,
  checked,
  setChecked,
  onChange,
  className,
}: {
  label?: string;
  checked: boolean;
  setChecked?: (e: boolean) => void;
  onChange?: any;
  className?: string;
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked && setChecked(!checked);
          onChange && onChange(e);
        }}
        className={`custom-checkbox`}
      />
      {label && (
        <span
          className={`text-sm text-primaryGrey cursor-pointer  ${className}`}
          onClick={() => {
            setChecked && setChecked(!checked);
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default GlobalCheckbox;
