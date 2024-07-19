import React from 'react';
import { ReactComponent as Spinner } from '../../SVGIcons/spinner.svg';

type Props = {
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  setStatus?: any;
  status?: string;
  classNames?: string;
  onClick?: any;
  loading?: boolean;
  StartIcon?: React.ReactNode;
  outlined?: boolean;
  disabled?: boolean;
  animate?: boolean;
};

const GlobalButton = ({
  text,
  type,
  setStatus,
  status,
  classNames,
  onClick,
  loading,
  StartIcon,
  outlined = false,
  disabled = false,
  animate = true,
}: Props) => {
  return (
    <button
      className={`w-full flex gap-2  ${disabled || loading ? 'cursor-not-allowed bg-primaryGrey opacity-50 border-primaryGrey' : 'cursor-pointer'} ${outlined ? `bg-white border border-primary` : `bg-primary`} rounded-full items-center justify-center py-3 ${!disabled && outlined ? `text-primary` : `text-white`} font-medium relative overflow-hidden outline-none
           ${!disabled && !outlined && animate && `after:bg-gradient-to-r after:from-primary after:via-primaryLight after:via-80% after:to-primaryLight after:w-96 after:h-96 after:-rotate-45 after:absolute after:-right-96 hover:after:right-10 after:transition-all after:ease-in-out after:duration-700`}
            ${loading && 'after:right-10 after:animate-pulse'} py-0 md:py-2 px-8 md:px-2 h-9 md:h-auto text-xs md:text-base whitespace-nowrap ${classNames}
        `}
      type={type ? type : 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {StartIcon && <span>{StartIcon}</span>}
      <span className="relative !z-10">{loading ? <Spinner className="animate-spin h-6" /> : text}</span>
    </button>
  );
};

export default GlobalButton;
