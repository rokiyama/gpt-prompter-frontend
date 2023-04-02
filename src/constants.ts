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
  'https://gist.github.com/rokiyama/a09fd44947da19b1fd5785c43d779073/raw/268fc4e798cb4dae7b401e9a3ce58c238c06f275/gpt-chat-system-messages.json';
