import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

export const i18n = new I18n({
  en: {
    ok: 'OK',
    cancel: 'Cancel',
    welcome: "Let's talk about something.",
    systemMessage: 'System message',
    reset: 'Reset',
    abort: 'Abort',
    resend: 'Resend',
    settings: 'Settings',
    apiKey: 'API Key',
    setApiKey: 'Set API Key',
    inputApiKey: 'Input API Key.',
    notSet: 'Not set',
    apiKeyIsNotSet:
      'API key is not set. Please set it from the settings screen.',
    errorOccurred: 'An error has occurred',
    sendMessage: 'Send a message',
  },
  ja: {
    ok: 'OK',
    cancel: 'キャンセル',
    welcome: '何か話してみましょう。',
    systemMessage: 'システムメッセージ',
    reset: 'リセット',
    abort: '中断',
    resend: '再送信',
    settings: '設定',
    apiKey: 'APIキー',
    setApiKey: 'APIキーを設定',
    inputApiKey: 'APIキーを入力してください。',
    notSet: '未設定',
    apiKeyIsNotSet:
      'ChatAIの利用を開始するために、OpenAIのAPIキーを設定しましょう。設定画面より設定してください。',
    errorOccurred: 'エラーが発生しました',
    sendMessage: 'メッセージを送信',
    apiKeyDescription: [
      'APIキーとは、OpenAIのAPIを使用するためのキーです。APIキーはOpenAI Platformから生成することができます。',
      '以下の手順でAPIキーを生成し、コピーしてください。',
      '・OpenAPI にサインアップする\nhttps://platform.openai.com',
      '・Menu → View API keys → Create new secret key を選択',
    ],
  },
});

i18n.locale = getLocales()[0].languageCode;
