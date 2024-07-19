//REDUX
import { combineReducers } from 'redux';
//REDUX-TOOLKIT
import { configureStore } from '@reduxjs/toolkit';
// REDUX_PERSIT
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
//SLICES
import drawerSlice, { setDrawerTab } from './drawer/drawerSlice';
import userSlice from './user/userSlice';
import tokenSlice from './token/tokenSlice';
import walletSlice from './wallet/walletSlice';
import providerSlice from './providers/providerSlice';
import customerSlice from './customer/customerSlice';
import productSlice from './products/productSlice';
import featuresSlice from './features/featuresSlice';
import dashboardSlice from './Dashboard/dashboardSlice';
import historySlice from './wallet/historySlice';
import adminSlice from './admin/adminSlice';
import faqSlice from './wallet/faqs/faqSlice';
import simulationSlice from './cloudk/simulation';
import notificationsSlice from './notifications/notificationsSlice';
import cloudkSlice from './cloudk/cloudk.slice';
import generalSlice from './general/generalSlice';
import { CLOUD_SLICE_NAME } from './cloudk/cloudk.slice';
import tokensSettingsSlice from './tokensSettings/tokensSettingsSlice';
import defi360Slice, { DEFI_360_SLICE_NAME } from './defi-360/defi-360-slice';
import { SIMULATION_SLICE_NAME } from './cloudk/simulation';
import platformSlice from './platform/platformSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'drawer'],
};

const rootReducer = combineReducers({
  drawer: drawerSlice,
  user: userSlice,
  token: tokenSlice,
  general: generalSlice,
  wallet: walletSlice,
  provider: providerSlice,
  customer: customerSlice,
  product: productSlice,
  features: featuresSlice,
  dashboard: dashboardSlice,
  history: historySlice,
  notifications: notificationsSlice,
  admin: adminSlice,
  faq: faqSlice,
  [CLOUD_SLICE_NAME]: cloudkSlice,
  tokensSettings: tokensSettingsSlice,
  [DEFI_360_SLICE_NAME]: defi360Slice,
  [SIMULATION_SLICE_NAME]: simulationSlice,
  platform: platformSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export const handleTabChange = (newTab: string) =>
  store.dispatch(setDrawerTab(newTab));
