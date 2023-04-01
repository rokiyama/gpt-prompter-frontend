import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadApiKey = async () => {
  const value = await AsyncStorage.getItem('OPENAI_API_KEY');
  if (value != null) {
    console.log(`[useApiKeyPersistent] load from asyncStorage`);
    return value;
  }
};

export const saveApiKey = (apiKey: string) =>
  AsyncStorage.setItem('OPENAI_API_KEY', apiKey);
