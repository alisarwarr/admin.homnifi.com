//REDUX-TOOLKIT
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TINFLATIONRULES, TMACHINE_DATA } from '../../interfaces/cloudk';

export interface TemplateState {
  value: string;
  infalationRules: TINFLATIONRULES[];
  currentinfalationRules: TINFLATIONRULES;
  products: any[];
  userRewards: any[];
  userMachineList: TMACHINE_DATA[] | null;

  getMachineDetailsLoading: boolean;
}

export const CLOUD_SLICE_NAME = 'cloudk';
const initialState: TemplateState = {
  value: '',
  products: [],
  userRewards: [],
  infalationRules: [
    {
      inflation: {
        _id: '668be0be705e6de012ac3615',
        adminNote: 'test',
        name: 'Genesis',
      },
      rules: [
        {
          dropPercentage: 95,
          productionDecreasePercentage: 65,
          increaseDLPPercentage: 5,
          mintingBoost: 0.12,
        },
      ],
    },
  ],
  currentinfalationRules: {
    inflation: {
      _id: '668be0be705e6de012ac3615',
      adminNote: 'test',
      name: 'Genesis',
    },
    rules: [
      {
        dropPercentage: 95,
        productionDecreasePercentage: 65,
        increaseDLPPercentage: 5,
        mintingBoost: 0.12,
      },
    ],
  },
  userMachineList: null,

  getMachineDetailsLoading: false,
};

const slice = createSlice({
  name: CLOUD_SLICE_NAME,
  initialState,
  reducers: {
    setCloudkSlice: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    setUserMachineList: (state, action: PayloadAction<any>) => {
      return { ...state, userMachineList: action.payload };
    },
  },
});

export const cloudkSliceAction = slice.actions;

export const selectCloudkSlice = (state: {
  [CLOUD_SLICE_NAME]: TemplateState;
}) => state[CLOUD_SLICE_NAME];

// select single machine
export const selectCloudMachine = (
  state: {
    [CLOUD_SLICE_NAME]: TemplateState;
  },
  id: string
) => {
  if (state[CLOUD_SLICE_NAME].userMachineList)
    return state[CLOUD_SLICE_NAME].userMachineList.find(
      (machine) => machine._id === id
    );
};

export default slice.reducer;
