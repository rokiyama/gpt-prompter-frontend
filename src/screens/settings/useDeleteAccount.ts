import axios from 'axios';
import { useCallback } from 'react';

export const useDeleteAccount = () => {
  const deleteAccount = useCallback(async (idToken: string) => {
    try {
      await axios.post(process.env.EXPO_PUBLIC_API_HTTP_URL || '', {
        idToken,
      });
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
