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

export const testdata = {
  ja: [
    { id: '0', text: 'あなたは親切なアシスタントです。' },
    { id: '1', text: '猫になったつもりで会話してください。' },
    { id: '2', text: '絵文字をたくさん使ってください。' },
  ],
  en: [
    { id: '10', text: 'You are a helpful assistant.' },
    { id: '11', text: 'Converse as if you were a cat.' },
  ],
};
