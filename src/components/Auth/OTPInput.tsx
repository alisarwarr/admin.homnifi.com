import React from 'react';

const OTPInput = () => {
  const inputRefs = React.useRef<HTMLInputElement[]>(Array(6).fill(null));
  const [vCode, setVCode] = React.useState(Array.from({ length: 6 }, () => ''));

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (isNaN(Number(value))) return;
    const updatedOtp = [...vCode];
    updatedOtp[index] = value;
    setVCode(updatedOtp);

    if (value && index < vCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleInputPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('text');
    const otpArray = pastedData
      .slice(0, 6) // Limit to 6 characters
      .split('')
      .map((char) => (isNaN(Number(char)) ? '' : char));
    setVCode(otpArray);
  };

  const handleInputKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !event.currentTarget.value && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 w-full">
      {Array.from({ length: 6 }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="border border-borderBlue focus:border-primary focus:shadow-lg focus:shadow-primary/20 w-12 h-16 text-xl text-center outline-none bg-transparent rounded-full"
          ref={(el) => (inputRefs.current[index] = el!)}
          value={vCode[index]}
          onChange={(e) => handleInputChange(index, e)}
          onPaste={handleInputPaste}
          onKeyDown={(e) => handleInputKeyDown(index, e)}
          placeholder="-"
        />
      ))}
    </div>
  );
};

export default OTPInput;
