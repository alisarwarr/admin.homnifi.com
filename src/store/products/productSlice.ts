import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TProduct {
  _id: string;
  name: string;
  url: string;
  imageUrl: string;
  externalProductId: string;
  skuId: string;
  price: number;
  mintingPower: number;
  mintingPowerPerc: number;
  defiPortal: boolean;
  airdropPromo: number;
  stakeLimit: number;
  tokenAirdrop: number;
  licenseName: string;
  profitSplitFee: number;
  aiTradingNews: boolean;
  capping: number | null; // null if unlimited
  aiTradingSoftwareName: string;
  superNodeLevel: number;
  globalPool: number;
  bonus: number;
}

export interface ProductStateSlice {
  // products: {
  //   list: Product[];
  //   paginate: any;
  // };
  products: TProduct[];
}

const initialState: ProductStateSlice = {
  // products: {
  //   list: [],
  //   paginate: {},
  // },
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      return { ...state, products: action.payload };
    },
  },
});

export const { setProducts } = productSlice.actions;
export const selectProductSlice = (state: { product: ProductStateSlice }) => state.product;

export default productSlice.reducer;
