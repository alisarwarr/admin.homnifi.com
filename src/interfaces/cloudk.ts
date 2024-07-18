export interface TINFLATIONRULES {
  inflation: {
    _id: string;
    adminNote: string;
    name: string; // Added "name" to match the initial state
  };
  rules: {
    dropPercentage: number;
    productionDecreasePercentage: number;
    increaseDLPPercentage: number;
    mintingBoost: number;
  }[];
}

export type TRewards = {
  _id: null;
  lifetimeReward: number;
  claimableRewards: number;
};

export type TStakeToken = {
  _id: string;
  name: string;
  symbol: string;
  color: string;
  iconUrl: string;
};

export type TMACHINE_DATA = {
  _id: string;
  user: { blockchainId: string };
  name: string;
  imageUrl: string;
  externalMachineId: string;
  stakeLimit: number;
  rewardWallet: string;
  stakeToken: TStakeToken;
  status: string;
  autoCompound: boolean;
  lockedPrice: number;
  allTimeHigh: number;
  dlp: number;
  mintingPower: number;
  boost: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;

  ath?: number;
  lykPrice?: number;
  profitGained?: number;
  totalStaked?: number;

  rewards: TRewards;
};
