import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SettingsState {
  apiKey: string;
}

const initialState: SettingsState = {
  apiKey: '',
};

export const settingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
  },
});

export const { setApiKey } = settingsSlice.actions;

export const selectApiKey = (state: RootState) => state.settings.apiKey;

export default settingsSlice.reducer;
