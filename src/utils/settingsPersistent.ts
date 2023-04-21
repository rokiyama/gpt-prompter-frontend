import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import { initialState, SettingsState } from '../redux/slices/settingsSlice';
import { uuid } from './uuid';

export const loadSettings = async () => {
  const value = await AsyncStorage.getItem('SETTINGS');
  try {
    const obj = Settings.parse(JSON.parse(value ?? ''));
    console.log(`[useApiKeyPersistent] load from asyncStorage`, obj);
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
};

export const saveSettings = async (settings: SettingsState) => {
  await AsyncStorage.setItem('SETTINGS', JSON.stringify(settings));
  console.log('[useApiKeyPersistent] saved', settings);
};

const schemaForType =
  <T>() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

const Settings = schemaForType<SettingsState>()(
  z.object({
    userId: z.string(),
    apiKey: z.string(),
    mode: z.union([z.literal('userId'), z.literal('apiKey')]),
  })
);
