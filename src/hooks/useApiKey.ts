import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setApiKey } from '../redux/slices/settingsSlice';
import { loadApiKey } from '../utils/apiKeyPersistent';

export const useApiKey = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const apiKey = await loadApiKey();
      if (apiKey) {
        dispatch(setApiKey(apiKey));
        // } else {
        //   setAlertModalVisible(true);
      }
    })();
  }, []);
};
