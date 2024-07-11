import React from 'react';
import GlobalInput from '../Global/GlobalInput';

export default function FormikInput({
  label,
  type = 'text',
  name,
  onChange = () => {},
  disabled = false,
  value = '',
  error,
  placeholder,
  shrink = undefined,
  inputStyle,
  touched,
  inputRef,
  className,
  showAdornment,
  adornment,
  multiline = false,
  rows = 0,
  isError = true,
}: {
  label?: string;
  type: string;
  name: string;
  onChange?: any;
  value?: any;
  error?: any;
  placeholder?: string;
  disabled?: boolean;
  shrink?: boolean;
  inputStyle?: any;
  touched?: any;
  inputRef?: any;
  className?: string;
  showAdornment?: boolean;
  adornment?: any;
  multiline?: boolean;
  rows?: number;
  isError?: boolean;
}) {
  return (
    <div className="w-full">
      <div className={`flex flex-col gap-1 relative ${className}`}>
        <GlobalInput
          label={label}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => {}} // Adjust if you have onBlur functionality
          isError={error && touched}
          error={error}
          disabled={disabled}
          className={className}
          labelStyle="text-sm font-medium" // Adjust the label style as needed
        />
        {error && isError && touched && <span className="text-xs text-errorColor">{error}</span>}
      </div>
    </div>
  );
}
