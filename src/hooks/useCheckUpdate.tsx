import {
  checkForUpdateAsync,
  fetchUpdateAsync,
  reloadAsync,
} from 'expo-updates';
import { useEffect } from 'react';
import { AppState } from 'react-native';

export const useCheckUpdate = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    const subscription = AppState.addEventListener('change', async () => {
      try {
        const update = await checkForUpdateAsync();
        if (update.isAvailable) {
          await fetchUpdateAsync();
          await reloadAsync();
        }
      } catch (error) {
        console.warn(`Error fetching latest Expo update: ${error}`);
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
};
