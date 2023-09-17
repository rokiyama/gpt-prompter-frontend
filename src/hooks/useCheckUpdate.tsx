import {
  checkForUpdateAsync,
  fetchUpdateAsync,
  reloadAsync,
} from 'expo-updates';
import { useEffect, useState } from 'react';
import { Alert, AppState, AppStateStatus } from 'react-native';
import { i18n } from '../i18n';

export const useCheckUpdate = () => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    const subscription = AppState.addEventListener(
      'change',
      async (state: AppStateStatus) => {
        if (state !== 'active' || dismissed) {
          return;
        }
        try {
          const update = await checkForUpdateAsync();
          if (update.isAvailable) {
            await fetchUpdateAsync();
            Alert.alert(
              i18n.t('updateAvailableTitle'),
              i18n.t('updateAvailableBody'),
              [
                {
                  text: i18n.t('cancel'),
                  onPress: () => setDismissed(true),
                  style: 'cancel',
                },
                {
                  text: i18n.t('ok'),
                  onPress: () => reloadAsync(),
                },
              ]
            );
          }
        } catch (error) {
          console.warn(`Error fetching latest Expo update: ${error}`);
        }
      }
    );
    return () => {
      subscription.remove();
    };
  }, [dismissed]);
};
