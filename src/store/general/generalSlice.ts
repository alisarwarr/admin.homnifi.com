import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  TCountry,
  TMaintenance,
  TSupport,
} from '../../components/types/general/general.types';

interface UserSliceState {
  countries: TCountry[] | null;
  convertedPrice: number;
  maintenance: TMaintenance | null;
  supportList: TSupport[];
  supportLoader: boolean;
}

const initialState: UserSliceState = {
  countries: null,
  maintenance: null,
  convertedPrice: 0,
  supportList: [],
  supportLoader: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<TCountry[]>) => {
      return {
        ...state,
        countries: action.payload,
      };
    },
    setConvertedPrice: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        convertedPrice: action.payload,
      };
    },
    setMaintenance: (state, action: PayloadAction<TMaintenance>) => {
      return {
        ...state,
        maintenance: action.payload,
      };
    },

    setSupportList: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        supportList: action.payload,
      };
    },

    setSupportLoader: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        supportLoader: action.payload,
      };
    },
  },
});

export const {
  setCountry,
  setConvertedPrice,
  setMaintenance,
  setSupportList,
  setSupportLoader,
} = generalSlice.actions;

export const selectCountry = (state: { general: UserSliceState }) =>
  state.general.countries;
export const selectConvertedPrice = (state: { general: UserSliceState }) =>
  state.general.convertedPrice;
export const selectMaintenance = (state: { general: UserSliceState }) =>
  state.general.maintenance;

export const selectSupport = (state: { general: UserSliceState }) =>
  state.general;

export default generalSlice.reducer;
