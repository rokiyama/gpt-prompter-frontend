import { User } from './types/chat';

export const USER: User = {
  id: 'user',
  name: 'user',
};

export const CHAT_AI: User = {
  id: 'chatGpt',
  name: 'ChatGPT',
  avatar: 'https://chat.openai.com/apple-touch-icon.png',
};

export const SYSTEM: User = {
  id: 'system',
  name: 'system',
};

export const SYSTEM_MESSAGES_URL =
  'https://gpt-chat-misc.vercel.app/systemMessage.json';
