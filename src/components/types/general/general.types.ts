export type TCountry = {
  code: string;
  name: string;
  disabled: boolean;
};

export type TMaintenance = {
  startDateTime?: string;
  endDateTime?: string;
  reason: string;
  note: string;
  coundownShow?: boolean;
  webhookWorking?: boolean;
  cronJobWorking?: boolean;
  apiWorking?: boolean;
};

export type TSupport = {
  name: string;
  link: string;
  logo: string;
  icon: string;
  background: string;
  ordinator: number;
};

export type TCountryResponse = TCountry[];
