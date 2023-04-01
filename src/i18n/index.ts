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
      'APIキーが設定されていません。設定画面より設定してください。',
    errorOccurred: 'エラーが発生しました',
  },
});

i18n.locale = getLocales()[0].languageCode;
