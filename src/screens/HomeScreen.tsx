import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApiKey } from '../hooks/useApiKey';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({}: Props) => {
  const tw = useTailwind();
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [loading, setLoading] = useState(false);
  const { apiKey, loadApiKey } = useApiKey();
  useEffect(() => {
    loadApiKey();
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: Array<IMessage> = []) => {
    setMessages((previousMessages: Array<IMessage>) =>
      GiftedChat.append(previousMessages, messages)
    );
    setLoading(true);
  }, []);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        isTyping={loading}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};
