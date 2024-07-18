import React from 'react';
import { homnifiLogo } from '../../images';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between text-sm py-4 px-0">
      <img
        src={homnifiLogo}
        alt="Homnifi Logo"
        className="w-32 cursor-pointer"
      />
    </div>
  );
};

export default AuthHeader;
