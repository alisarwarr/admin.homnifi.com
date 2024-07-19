import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface State {
  ads: any | null;
}

const initialState: State = {
  ads: [],
};

const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    setAds: (state, action: PayloadAction<any>) => {
      return { ...state, ads: action.payload };
    },
  },
});

export const { setAds } = platformSlice.actions;
export const selectPlatformSlice = (state: RootState) => state.platform;
export default platformSlice.reducer;
