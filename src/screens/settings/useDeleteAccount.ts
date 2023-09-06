import axios from 'axios';
import Constants from 'expo-constants';
import { useCallback } from 'react';

export const useDeleteAccount = () => {
  const deleteAccount = useCallback(async (idToken: string) => {
    await axios.post(Constants.expoConfig?.extra?.backendApiDeleteAccountUrl, {
      idToken,
    });
  }, []);

  return {
    deleteAccount,
  };
};
