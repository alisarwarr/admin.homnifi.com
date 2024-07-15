import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  onClick?: any;
  loadingType?: 'text' | 'circular';
  buttonType?: 'submit' | 'button';
  disable?: boolean;
}

const Button = ({
  children,
  loading,
  className,
  onClick,
  loadingType = 'text',
  buttonType = 'button',
  disable = false,
}: Props) => {
  return (
    <button
      className={`rounded-full  px-6 py-2 flex justify-center items-center cursor-pointer bg-buttonColor bg-primary text-white ${className}`}
      disabled={loading || disable}
      onClick={onClick}
      type={buttonType}
    >
      {loading ? (
        <>
          {loadingType === 'text' ? (
            <span>Loading...</span>
          ) : (
            <RotatingLines visible={true} width="20" strokeWidth="3" animationDuration="0.75" strokeColor="white" />
          )}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
