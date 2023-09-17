import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { authSlice } from './slices/authSlice';
import { chatSlice } from './slices/chatSlice';
import { externalDataSlice } from './slices/externalDataSlice';
import { settingsSlice } from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer,
    chat: chatSlice.reducer,
    externalData: externalDataSlice.reducer,
  },
  middleware:
    process.env.EXPO_PUBLIC_APP_ENV === 'production'
      ? undefined
      : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
