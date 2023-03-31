import { randomUUID } from 'expo-crypto';
import { User } from 'react-native-gifted-chat';

export const CHAT_AI: User = {
  _id: 2,
  name: 'ChatGPT',
  avatar: 'https://chat.openai.com/apple-touch-icon.png',
};

export const SYSTEM: User = {
  _id: 3,
  name: 'system',
  avatar: 'https://placeimg.com/140/140/any',
};

export const FIRST_MESSAGE = {
  _id: randomUUID(),
  text: 'Waiting for input...',
  createdAt: new Date(),
  user: SYSTEM,
  system: true,
};
