import { randomUUID } from 'expo-crypto';
import { Configuration, OpenAIApi } from 'openai';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { CHAT_AI, FIRST_MESSAGE, SYSTEM } from '../constants';
import { useApiKey } from '../hooks/useApiKey';
import { useOpenAI } from '../hooks/useOpenAI';
import { useSpeech } from '../hooks/useSpeech';

export const HomeScreen = () => {
  const tw = useTailwind();
  const [openAI, setOpenAI] = useState<OpenAIApi | null>(null);
  const { apiKey, loadApiKey } = useApiKey();
  const { messages, setMessages, loading, sendMessages, cancel } =
    useOpenAI(openAI);
  const { speaking, speak, stop } = useSpeech();

  useEffect(() => {
    setMessages([FIRST_MESSAGE]);
  }, [setMessages]);

  useEffect(() => {
    loadApiKey();
  }, [loadApiKey]);

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    setOpenAI(new OpenAIApi(new Configuration({ apiKey })));
  }, [apiKey]);

  const speakLatestMessage = useCallback(() => {
    if (messages.length < 2) {
      return;
    }
    const latest = messages[messages.length - 1];
    if (latest.user._id !== CHAT_AI._id) {
      return;
    }
    speak(latest.text);
  }, [messages, speak]);

  useEffect(() => {
    speakLatestMessage();
  }, [messages, speakLatestMessage]);

  const onSend = useCallback(
    (newMsgs: Array<IMessage> = []) => {
      console.log(newMsgs);
      const allMessages = [...messages, ...newMsgs];
      setMessages(allMessages);
      sendMessages(allMessages);
    },
    [messages, sendMessages, setMessages]
  );

  const sendSystemMessage = () => {
    Alert.prompt('Input system message:', '', (input) => {
      if (input) {
        setMessages([
          ...messages,
          {
            _id: randomUUID(),
            createdAt: Date.now(),
            text: input,
            user: SYSTEM,
          },
        ]);
      }
    });
  };

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
            {!loading && <Button title="System" onPress={sendSystemMessage} />}
            <Button
              title="Reset"
              onPress={() => setMessages([FIRST_MESSAGE])}
            />
            {loading && <Button title="Cancel" color="red" onPress={cancel} />}
            {speaking && <Button title="Stop" color="red" onPress={stop} />}
            {!loading && !speaking && messages.length > 2 && (
              <Button title="Replay" onPress={speakLatestMessage} />
            )}
            {!loading && !speaking && messages.length > 1 && (
              <Button title="Resend" onPress={() => sendMessages(messages)} />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};
