import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadApiKey, saveApiKey } from '../../utils/apiKeyPersistent';
import { RootState } from '../store';

interface SettingsState {
  apiKey: string;
}

const initialState: SettingsState = {
  apiKey: '',
};

export const load = createAsyncThunk('settings/load', async () => {
  const apiKey = await loadApiKey();
  return apiKey ?? '';
});

export const save = createAsyncThunk(
  'settings/save',
  async (apiKey: string) => {
    await saveApiKey(apiKey);
    return apiKey;
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
    builder.addCase(load.fulfilled, (state, action) => {
      state.apiKey = action.payload;
    });
    builder.addCase(save.fulfilled, (state, action) => {
      state.apiKey = action.payload;
    });
  },
});

export const { setApiKey } = settingsSlice.actions;

export const selectApiKey = (state: RootState) => state.settings.apiKey;

// export default settingsSlice.reducer;
