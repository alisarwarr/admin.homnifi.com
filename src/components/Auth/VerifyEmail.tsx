import React from 'react';
import { useNavigate } from 'react-router-dom';
import OTPInput from './OTPInput';
import GlobalButton from '../Global/GlobalButton';
import HelperText from '../Global/HelperText';

const VerifyEmail = ({ setStatus }: { setStatus: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-4 flex flex-col gap-10 justify-center">
      <div className="flex flex-col gap-2">
        <div className="font-baumans text-2xl">Email Sent</div>
        <span className="text-sm text-primaryGrey">
          Thank you. <br />
          Please check your inbox for verification code sent to
          example@email.com
        </span>
      </div>
      <div className="w-full">
        <OTPInput />
      </div>
      <div className="flex flex-col gap-2">
        <GlobalButton
          text="Verify"
          setStatus={setStatus}
          status="accountType"
        />
        <HelperText
          text={
            <div>
              Didn't receive the code?{' '}
              <button
                className="text-primary"
                onClick={() => navigate('/auth/forget-password')}
              >
                Send again
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
