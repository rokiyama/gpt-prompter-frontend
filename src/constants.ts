import { Platform } from 'react-native';
import { User } from './types/chat';

export const USER: User = {
  id: 'user',
  name: 'user',
};

export const CHAT_AI: User = {
  id: 'chatGpt',
  name: 'ChatGPT',
  avatar: require('../assets/icon.png'),
};

export const SYSTEM: User = {
  id: 'system',
  name: 'system',
};

export const PRIMARY_COLOR = Platform.OS === 'android' ? '#2196F3' : '#007AFF';
