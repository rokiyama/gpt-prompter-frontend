import { configureStore } from '@reduxjs/toolkit';
import { chatSlice } from './slices/chatSlice';
import { externalDataSlice } from './slices/externalDataSlice';
import { settingsSlice } from './slices/settingsSlice';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer,
    chat: chatSlice.reducer,
    externalData: externalDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
