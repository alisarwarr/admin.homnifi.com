//REDUX-TOOLKIT
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { getDaysInMonth } from '../../utils/utils';

export type TChartDataType = {
  id: string;
  color?: string;
  data: {
    x: string;
    y: number;
    color?: string;
  }[];
};

interface Machine {
  _id: string;
  user: {
    _id: string;
    email: string;
    blockchainId: string;
  };
  name: string;
  imageUrl: string;
  externalMachineId: string;
  stakeLimit: number;
  rewardWallet: string;
  stakeToken: {
    _id: string;
    name: string;
    symbol: string;
    color: string;
    iconUrl: string;
  };
  status: string;
  autoCompound: boolean;
  lockedPrice: number;
  allTimeHigh: number;
  dlp: number;
  mintingPower: number;
  boost: number;
}

interface Product {
  name: string;
  stackLimit: number;
  minitingPower: number;
}
export type TChartValueType = {
  x: string;
  y: number;
  color?: string;
}[];

export interface SimulationState {
  value: string;

  machines: Machine[];
  simulationData: any[];
  prices: number[];
  collateral: number;
  selectedMachine: Machine | null;
  startSimulationLoading: boolean;

  products: Product[];
  LYK: number;
  stackAmount: number;
  calcualtedStackAmount: number;
  years: any;
  selectedYears: number;
  selectedProduct: any;
  rewardPerDay: number;
  autoCompound: boolean;
  monthlyReward: number;
  rewardsCalculatorChartData: TChartDataType[];
  rewardList: TChartValueType;
  lykList: TChartValueType;
  athList: TChartValueType;
  dlpList: TChartValueType;
  x: number[];
  y1: number[];
  y2: number[];
  y3: number[];
  y4: number[];
  totalReward: number;
  totalLoss: number;
  selectedMonth: number;
}

const getDaysForMonths = (months: number[]): number[] => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const result: any = [];

  months.forEach((month) => {
    // Adjust year if month exceeds 12
    while (month > 12) {
      month -= 12;
      currentYear++;
    }
  });

  return result;
};

export const calculatePerdayReward = (
  product: Product,
  stake: number,
  lykPrice: number,
  autoCompound: boolean,
  state: any
) => {
  console.log('firstfirstfirst', state.calcualtedStackAmount);
  // if (state.autoCompound) {
  //   state.calcualtedStackAmount =
  //     state.calcualtedStackAmount + state.rewardPerDay;
  //   // state.rewardPerDay = state.rewardPerDay + state.calcualtedStackAmount;
  // }

  // Return the final calculated stack amount

  // if (state.autoCompound) {
  //   for (let index = 0; index < 30; index++) {
  //     const cap =
  //       state.calcualtedStackAmount * lykPrice * product.minitingPower;
  //     state.calcualtedStackAmount = state.calcualtedStackAmount + cap;
  //   }
  // } else {
  //   for (let index = 0; index < 30; index++) {
  //     const cap =
  //       state.calcualtedStackAmount * lykPrice * product.minitingPower;
  //     state.rewardPerDay = state.rewardPerDay + cap;
  //   }

  // return autoCompound ? cap : cap * 0.7;

  //

  let currentStake = state.calcualtedStackAmount || stake;

  let monthlyReward = 0;

  for (let index = 0; index <= 30; index++) {
    const dailyReward = currentStake * lykPrice * product.minitingPower;

    monthlyReward += dailyReward;

    if (autoCompound) {
      currentStake += dailyReward;
    } else {
      state.rewardPerDay = (state.rewardPerDay || 0) + dailyReward;
    }
  }

  // Update the calculated stack amount in the state
  state.calcualtedStackAmount = currentStake;

  // Update the monthly reward in the state
  state.monthlyReward = monthlyReward;
};

export const getRewardList = (years: number, rewardPerDay: number) => {
  let value = 0;
  const reward = Array.from({ length: years }, (_, i) => {
    return Number(Number((value = value + rewardPerDay)).toFixed(3));
  });

  return reward;
};

const chartOfLine = [
  { key: 'rewardList', name: 'Rewards' },
  { key: 'lykList', name: 'LYK' },
  { key: 'athList', name: 'ATH' },
  { key: 'dlpList', name: 'DLP' },
];

const calculateReward = (state: any) => {
  //   calculatePerdayReward(state.selectedProduct, state.calcualtedStackAmount, state.LYK, state.autoCompound, state);

  // state.autoCompound ?  :

  state.y1 = getRewardList(state.x.length, state.monthlyReward);
  state.y2 = Array.from({ length: state.x.length }, (_, i) => state.LYK);
  state.y3 = Array.from({ length: state.x.length }, (_, i) => state.LYK);
  state.y4 = Array.from({ length: state.x.length }, (_, i) => state.LYK);

  const list: any[] = [];
  chartOfLine.forEach((item, indexI) => {
    const storedValue = 'y' + (indexI + 1);
    const chartListItem = state.x.map((value: number, index: number) => {
      return {
        x: `${value} M`,
        y: Number(Number(state[storedValue][index] * value).toFixed(3)),
      };
    });
    state[item.key] = chartListItem;
    list.push({
      id: item.name,
      data: chartListItem,
    });
  });
  state.rewardsCalculatorChartData = list;

  //   totalReward

  state.totalReward = state.rewardList[state.rewardList.length - 1].y;
  state.totalLoss = state.autoCompound ? 0 : (state.rewardPerDay / 0.7) * 0.3;
};

export const SIMULATION_SLICE_NAME = 'simulation';
const initialState: SimulationState = {
  value: '',
  machines: [],
  prices: [],
  simulationData: [],
  collateral: 0,
  selectedMachine: null,
  startSimulationLoading: false,

  products: [
    {
      name: 'Homnifi A',
      stackLimit: 50000,
      minitingPower: 0.002,
    },
    {
      name: 'Homnifi B',
      stackLimit: 1500,
      minitingPower: 0.003,
    },
    {
      name: 'Homnifi C',
      stackLimit: 50000,
      minitingPower: 0.004,
    },
  ],

  LYK: 0,
  monthlyReward: 0,
  stackAmount: 1000,
  calcualtedStackAmount: 1000,
  selectedYears: 1,
  years: [1, 2, 3, 4, 5],
  selectedProduct: {
    name: 'Homnifi A',
    stackLimit: 50000,
    minitingPower: 0.002,
  },
  autoCompound: true,
  rewardPerDay: 0,
  totalReward: 0,
  selectedMonth: 1,
  totalLoss: 0,
  x: Array.from({ length: 12 }, (_, i) => i + 1), // years
  y1: [], // reward list
  y2: [], // lyk list
  y3: [],
  y4: [],

  rewardList: [
    {
      x: '2 M',
      y: 420,
    },
  ],
  lykList: [
    {
      x: '2 M',
      y: 420,
    },
  ],
  athList: [
    {
      x: '2 M',
      y: 420,
    },
  ],
  dlpList: [
    {
      x: '2 M',
      y: 420,
    },
  ],

  rewardsCalculatorChartData: [
    {
      id: 'Rewards',
      color: 'hsl(226, 70%, 50%)',
      data: [
        {
          x: '20 M',
          y: 1600,
        },
      ],
    },
    {
      id: 'LYK Price',
      data: [
        {
          x: '2 M',
          y: 420,
        },
      ],
    },
    {
      id: 'DLP',
      data: [
        {
          x: '2 M',
          y: 420,
        },
      ],
    },
    {
      id: 'ATH',
      color: 'hsl(161, 70%, 50%)',
      data: [
        {
          x: '2 M',
          y: 420,
        },
      ],
    },
  ],
};

const slice = createSlice({
  name: SIMULATION_SLICE_NAME,
  initialState,
  reducers: {
    setSimulationSlice: (
      state: SimulationState,
      action: PayloadAction<any>
    ) => {
      return { ...state, ...action.payload };
    },
    rewardPerDayaCalculator: (state, action: PayloadAction<any>) => {
      return { ...state, rewardPerDay: action.payload };
    },
    selectChart: (state: any, action: PayloadAction<any>) => {
      //   state.selectedYears = action.payload;
      //   const totalMonth = state.selectedYears * 12;
      //   calculateReward(state);
    },
    changeStakeAmount: (state: any, action: PayloadAction<any>) => {
      state.stackAmount = action.payload;
      calculateReward(state);
    },
    initRewardCalculator: (state: any) => {
      calculateReward(state);
    },
    setAutoCompound: (state: any, action: PayloadAction<any>) => {
      state.autoCompound = action.payload;
      calculateReward(state);
    },
  },
});

export const simulationSliceAction = slice.actions;
export const selectSimulationSlice = (state: {
  [SIMULATION_SLICE_NAME]: SimulationState;
}) => state[SIMULATION_SLICE_NAME];

export default slice.reducer;
