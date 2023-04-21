import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadSettings, saveSettings } from '../../utils/settingsPersistent';
import { RootState } from '../store';

export interface SettingsState {
  userId: string;
  apiKey: string;
  useApiKey: boolean;
}

const initialState: SettingsState = {
  userId: '',
  apiKey: '',
  useApiKey: false,
};

export const load = createAsyncThunk('settings/load', async () => {
  return await loadSettings();
});

export const save = createAsyncThunk(
  'settings/save',
  async (settings: SettingsState) => {
    await saveSettings(settings);
    return settings;
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setApiKey: (state, action: PayloadAction<string>) => {
      state.apiKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(load.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(save.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

// export const { setApiKey } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;
export const selectApiKey = (state: RootState) => state.settings.apiKey;

// export default settingsSlice.reducer;
