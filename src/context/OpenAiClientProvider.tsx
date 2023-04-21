import { Configuration, OpenAIApi } from 'openai';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectSettings } from '../redux/slices/settingsSlice';

export const OpenAiClientContext = createContext<OpenAIApi | null>(null);

export const OpenAiClientProvider = ({ children }: { children: ReactNode }) => {
  const [openAiClient, setOpenAiClient] = useState<OpenAIApi | null>(null);
  const { apiKey } = useAppSelector(selectSettings);

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    setOpenAiClient(new OpenAIApi(new Configuration({ apiKey })));
    console.log('openAiClient initialized');
  }, [apiKey]);

  return (
    <OpenAiClientContext.Provider value={openAiClient}>
      {children}
    </OpenAiClientContext.Provider>
  );
};
