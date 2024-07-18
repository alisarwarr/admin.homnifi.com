import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface tokensSettingsState {
  depositSettings: any | null;
  swapSettings: any | null;
  networkSettings: any | null;
}

const initialState: tokensSettingsState = {
  depositSettings: null,
  swapSettings: null,
  networkSettings: null,
};

const tokensSettingsSlice = createSlice({
  name: 'tokensSettings',
  initialState,
  reducers: {
    setDepositSettings: (state, action: PayloadAction<any>) => {
      return { ...state, depositSettings: action.payload };
    },
    setSwapSettings: (state, action: PayloadAction<any>) => {
      return { ...state, swapSettings: action.payload };
    },
    setNetworkSettings: (state, action: PayloadAction<any>) => {
      return { ...state, networkSettings: action.payload };
    },
  },
});

export const { setDepositSettings, setSwapSettings, setNetworkSettings } = tokensSettingsSlice.actions;
export const selectTokensSettings = (state: RootState) => state.tokensSettings;
export default tokensSettingsSlice.reducer;
