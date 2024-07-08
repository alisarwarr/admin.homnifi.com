import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FAQ {
  _id: string;
  type: 'DEPOSIT' | 'WITHDRAAW | TRANSFER | SWAP';
  question: string;
  url: string;
  status: 'ACTIVE' | 'INACTIVE'; // Assuming these are the only two possible values
  deletedAt: string | null; // Assuming it could be a string (date) or null
  createdAt: string; // Assuming it's always a string (date)
}
export interface FAQStateSlice {
  products: {
    list: FAQ[];
    paginate: any;
  };
}

const initialState: FAQStateSlice = {
  products: {
    list: [],
    paginate: {},
  },
};

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    setFaqs: (state, action: PayloadAction<any>) => {
      return { ...state, faqs: action.payload };
    },
  },
});

export const { setFaqs } = faqSlice.actions;
export const selectFaqSlice = (state: { product: FAQStateSlice }) => state.product;

export default faqSlice.reducer;
