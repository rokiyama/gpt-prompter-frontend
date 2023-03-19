import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const loadApiKey = useCallback(async () => {
    const value = await AsyncStorage.getItem('OPENAI_API_KEY');
    if (value != null) {
      console.log(`[useApiKey] load from asyncStorage`);
      setApiKey(value);
      return;
    }
    Alert.prompt('Input OpenAI API_Key:', '', (input) => {
      console.log(`[useApiKey] save to asyncStorage`);
      AsyncStorage.setItem('OPENAI_API_KEY', input);
      setApiKey(input);
    });
  }, []);
  return {
    apiKey,
    loadApiKey,
  };
};
