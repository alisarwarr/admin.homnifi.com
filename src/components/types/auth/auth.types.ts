export type TLogin = {
  username: string;
  password: string;
  captchaToken: string;
};

export type TSignup = {
  email: string;
  username: string;
  password: string;
  referralUpline: string;
  country: string;
  captchaToken: string;
};

export type TOtpRequest = {
  loginToken: string;
  otp: string;
};

export type GetTOtpResponse = {
  secret: string;
  url: string;
};

export type GetOtpRequest = {
  totpOtp?: number;
};
