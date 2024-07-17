import React from 'react';
import { ReactComponent as EyeOpenIcon } from '../../SVGIcons/eyeIcon.svg';
import { ReactComponent as EyeCloseIcon } from '../../SVGIcons/eyeCloseIcon.svg';
import { ReactComponent as WarningIcon } from '../../SVGIcons/warning.svg';

type TGlobalInput = {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  isError?: boolean | any;
  error?: string;
  value?: string | any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  labelStyle?: string;
};

const GlobalInput = ({
  label,
  placeholder,
  type,
  required,
  name,
  isError,
  error,
  value,
  onChange,
  className,
  disabled,
  labelStyle,
  onBlur,
}: TGlobalInput) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex flex-col gap-2 my-2 w-full">
      {label && (
        <div className={`text-sm font-medium text-primary ${labelStyle}`}>
          {label} {required && <span className="text-redDanger">*</span>}
        </div>
      )}
      <div className="relative flex items-center justify-center">
        <input
          autoComplete="off"
          disabled={disabled}
          name={name}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${
            disabled && 'cursor-not-allowed'
          } outline-none text-defaultBlack border py-2 px-8 text-xs rounded-full w-full ${
            isError ? 'border-redDanger' : 'border-blueGrey'
          } ${className}`}
        />
        {isError ? (
          <span className="absolute right-2">
            <WarningIcon className="w-6" />
          </span>
        ) : (
          type === 'password' && (
            <button type="button" className="absolute right-4" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeCloseIcon className="w-4" /> : <EyeOpenIcon className="w-4" />}
            </button>
          )
        )}
      </div>
      {error && isError && <span className="text-xs text-redDanger text-right">{error}</span>}
    </div>
  );
};

export default GlobalInput;
