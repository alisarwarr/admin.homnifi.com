import React from 'react';

const GlobalCheckbox = ({
  label,
  checked,
  setChecked,
  onChange,
}: {
  label?: string;
  checked: boolean;
  setChecked: (e: boolean) => void;
  onChange?: any;
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
      />
      {label && (
        <span className="text-xs text-primaryGrey cursor-pointer" onClick={() => setChecked(!checked)}>
          {label}
        </span>
      )}
    </div>
  );
};

export default GlobalCheckbox;
