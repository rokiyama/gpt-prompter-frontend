import { randomUUID } from 'expo-crypto';
import { Configuration, OpenAIApi } from 'openai';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { DangerButton } from '../component/DangerButton';
import { PrimaryButton } from '../component/PrimaryButton';
import { ChatAI } from '../constants';
import { useApiKey } from '../hooks/useApiKey';
import { useOpenAI } from '../hooks/useOpenAI';
import { useSpeech } from '../hooks/useSpeech';

const FIRST_MESSAGE = {
  _id: randomUUID(),
  text: 'Waiting for input...',
  createdAt: new Date(),
  user: ChatAI,
};

export const HomeScreen = () => {
  const tw = useTailwind();
  const [openAI, setOpenAI] = useState<OpenAIApi | null>(null);
  const { apiKey, loadApiKey } = useApiKey();
  const { messages, setMessages, loading, sendMessages, cancel } =
    useOpenAI(openAI);
  const { speaking, speak, stop } = useSpeech();

  useEffect(() => {
    setMessages([FIRST_MESSAGE]);
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

  useEffect(() => {
    if (messages.length < 2) {
      return;
    }
    const latest = messages[messages.length - 1];
    if (latest.user._id !== ChatAI._id) {
      return;
    }
    speak(latest.text);
  }, [messages]);

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
        renderChatFooter={() => (
          <View style={tw('flex-row justify-center')}>
            <PrimaryButton
              title="Reset"
              onPress={() => setMessages([FIRST_MESSAGE])}
            />
            {loading && <DangerButton title="Cancel" onPress={cancel} />}
            {speaking && <PrimaryButton title="Stop" onPress={stop} />}
          </View>
        )}
      />
    </SafeAreaView>
  );
};
