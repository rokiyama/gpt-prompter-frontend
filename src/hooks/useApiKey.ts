import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');

  return {
    apiKey,
    loadApiKey: async () => {
      const value = await AsyncStorage.getItem('OPENAI_API_KEY');
      if (value != null) {
        setApiKey(value);
        return;
      }
      Alert.prompt('Input OpenAI API_Key:', '', (input) => {
        AsyncStorage.setItem('OPENAI_API_KEY', input);
        setApiKey(input);
      });
    },
  };
};
