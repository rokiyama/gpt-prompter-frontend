import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { Configuration, OpenAIApi } from 'openai';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectSettings,
  setIsApiKeyConfigured,
} from '../redux/slices/settingsSlice';

type Context = {
  openAiClient: OpenAIApi | null;
  saveApiKey: (apiKey: string) => Promise<void>;
};

export const OpenAiClientContext = createContext<Context | null>(null);

export const OpenAiClientProvider = ({ children }: { children: ReactNode }) => {
  const [openAiClient, setOpenAiClient] = useState<OpenAIApi | null>(null);
  const { mode } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mode !== 'apiKey') {
      console.log('not apiKey mode');
      return;
    }
    (async () => {
      const apiKey = await getItemAsync('OPENAI_API_KEY');
      if (!apiKey) {
        console.log('apiKey is empty');
        return;
      }
      setOpenAiClient(initOpenAiClient(apiKey));
      dispatch(setIsApiKeyConfigured(true));
    })();
  }, [dispatch, mode]);

  const saveApiKey = useCallback(
    async (apiKey: string) => {
      await setItemAsync('OPENAI_API_KEY', apiKey);
      setOpenAiClient(initOpenAiClient(apiKey));
      dispatch(setIsApiKeyConfigured(true));
    },
    [dispatch]
  );

  return (
    <OpenAiClientContext.Provider value={{ openAiClient, saveApiKey }}>
      {children}
    </OpenAiClientContext.Provider>
  );
};

const initOpenAiClient = (apiKey: string): OpenAIApi => {
  console.log('openAiClient initialized');
  return new OpenAIApi(new Configuration({ apiKey }));
};
