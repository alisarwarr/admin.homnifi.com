export interface WithdrawSettingsList {
  _id: string;
  name: string;
  symbol: string;
  type: string;
  withdrawType: string;
  color: string;
  networks: any[];
  iconUrl: string;
  settings?: any;
}
