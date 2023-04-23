import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
import { schemaForType } from '../../utils/schema';
import { uuid } from '../../utils/uuid';
import { RootState } from '../store';

const ASYNC_STORAGE_KEY_SETTINGS = 'SETTINGS';

interface SettingsState {
  userId: string;
  mode: 'userId' | 'apiKey';
  isApiKeyConfigured: boolean;
}

const initialState: SettingsState = {
  userId: '',
  mode: 'userId',
  isApiKeyConfigured: false,
};

export const load = createAsyncThunk('settings/load', async () => {
  const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY_SETTINGS);
  try {
    const obj = Settings.parse(JSON.parse(value ?? ''));
    console.log(`load from asyncStorage`, obj);
    return obj;
  } catch (err) {
    // ignore error
    console.log('could not load settings', err);
  }
  // create new settings and save
  const settings = {
    ...initialState,
    userId: uuid(),
  };
  await saveSettings(settings);
  return settings;
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
    setIsApiKeyConfigured: (state, action: PayloadAction<boolean>) => {
      state.isApiKeyConfigured = action.payload;
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

export const { setIsApiKeyConfigured } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

const saveSettings = async (settings: SettingsState) => {
  await AsyncStorage.setItem(
    ASYNC_STORAGE_KEY_SETTINGS,
    JSON.stringify(settings)
  );
};

const Settings = schemaForType<SettingsState>()(
  z.object({
    userId: z.string(),
    mode: z.union([z.literal('userId'), z.literal('apiKey')]),
    isApiKeyConfigured: z.boolean(),
  })
);
