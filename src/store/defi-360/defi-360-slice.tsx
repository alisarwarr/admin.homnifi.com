//REDUX-TOOLKIT
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';


export interface State {
    autoCompoundPenality: any | null;
}

export const DEFI_360_SLICE_NAME = 'defi_360';

const initialState: State = {
    autoCompoundPenality: null
};


const slice = createSlice({
  name: DEFI_360_SLICE_NAME,
  initialState,
  reducers: {
    setAutoCompoundPenality: (state, action: PayloadAction<any>) => {
      return { ...state, autoCompoundPenality: action.payload };
    },
  },
});


export const { setAutoCompoundPenality } = slice.actions;
export const selectDefi360 = (state: RootState) => state[DEFI_360_SLICE_NAME];
export default slice.reducer;