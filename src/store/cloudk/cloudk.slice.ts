//REDUX-TOOLKIT
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TINFLATIONRULES } from '../../interfaces/cloudk';

export interface TemplateState {
  value: string;
  infalationRules: TINFLATIONRULES[];
  currentinfalationRules: TINFLATIONRULES;
  products: any[];
  userRewards: any[];
  userMachineList: any[] | null;
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

export default slice.reducer;
