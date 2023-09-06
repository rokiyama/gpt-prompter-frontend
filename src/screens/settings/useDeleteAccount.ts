import axios from 'axios';
import Constants from 'expo-constants';
import { useCallback } from 'react';

export const useDeleteAccount = () => {
  const deleteAccount = useCallback(async (idToken: string) => {
    try {
      await axios.post(
        Constants.expoConfig?.extra?.backendApiDeleteAccountUrl,
        {
          idToken,
        }
      );
      return 'success';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          return 'unauthorized';
        }
        if (err.response?.status === 409) {
          return 'alreadyReservedForDeletion';
        }
      }
      throw err;
    }
  }, []);

  return {
    deleteAccount,
  };
};
