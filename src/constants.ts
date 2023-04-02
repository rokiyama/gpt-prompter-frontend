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
  'https://gist.githubusercontent.com/rokiyama/a09fd44947da19b1fd5785c43d779073/raw/e39590d3fe05964282ab99dfef29055e2b056e85/gpt-chat-system-messages.json';
