import HCaptcha from '@hcaptcha/react-hcaptcha';
import React from 'react';

const Captcha = () => {
  const [token, setToken] = React.useState('');

  const handleVerificationSuccess = (token: string) => {
    setToken(token);
  };

  return (
    <div className="flex justify-center">
      <HCaptcha
        sitekey={`17fe97cc-9c34-4be0-91d2-19a41f442228`}
        onVerify={handleVerificationSuccess}
      />
    </div>
  );
};

export default Captcha;
