import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import { SettingsState } from '../redux/slices/settingsSlice';
import { uuid } from './uuid';

const Settings = z.object({
  userId: z.string(),
  apiKey: z.string(),
  useApiKey: z.boolean(),
});

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
    userId: uuid(),
    apiKey: '',
    useApiKey: false,
  };
  await saveSettings(settings);
  return settings;
};

export const saveSettings = async (settings: SettingsState) => {
  await AsyncStorage.setItem('SETTINGS', JSON.stringify(settings));
  console.log('[useApiKeyPersistent] saved', settings);
};
