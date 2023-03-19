import { randomUUID } from 'expo-crypto';
import { Configuration, OpenAIApi } from 'openai';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { ChatAI } from '../constants';
import { useApiKey } from '../hooks/useApiKey';
import { useOpenAI } from '../hooks/useOpenAI';

export const HomeScreen = () => {
  const tw = useTailwind();
  const [openAI, setOpenAI] = useState<OpenAIApi | null>(null);
  const { apiKey, loadApiKey } = useApiKey();
  const { messages, setMessages, loading, sendMessages } = useOpenAI(openAI);

  useEffect(() => {
    setMessages([
      {
        _id: randomUUID(),
        text: 'Waiting for input...',
        createdAt: new Date(),
        user: ChatAI,
      },
    ]);
  }, []);

  useEffect(() => {
    loadApiKey();
  }, [loadApiKey]);

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    setOpenAI(new OpenAIApi(new Configuration({ apiKey })));
  }, [apiKey]);

  const onSend = useCallback(
    (newMsgs: Array<IMessage> = []) => {
      if (!openAI) {
        console.error('openAI is null');
        return;
      }
      sendMessages(newMsgs);
    },
    [openAI, sendMessages]
  );

  return (
    <SafeAreaView style={tw('flex-1')}>
      <GiftedChat
        messages={messages.slice().reverse()}
        onSend={(messages) => onSend(messages)}
        isTyping={loading}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};
