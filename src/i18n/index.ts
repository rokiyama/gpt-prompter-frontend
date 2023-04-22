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
    useApiKeyMode: 'Use API Key',
    apiKey: 'API Key',
    setApiKey: 'Set API Key',
    inputApiKey: 'Input API Key.',
    notSet: 'Not set',
    apiKeyIsNotSet:
      'API key is not set. Please set it from the settings screen.',
    errorOccurred: 'An error has occurred',
    sendMessage: 'Send a message',
    apiKeyDescription: [
      'The API key gives the app direct access to the OpenAI API.',
      "An API key is a key used to access OpenAI's API. An API key can be generated from the OpenAI Platform.",
      'Please follow the steps below to generate and copy the API key.',
      '- Sign up for OpenAPI at https://platform.openai.com .',
      "- Execute 'Create new secret key' on the page https://platform.openai.com/account/api-keys .",
    ],
    confirmSystemMessage: 'Are you sure you want to enter this system message?',
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
    useApiKeyMode: 'APIキーを使用する',
    apiKey: 'APIキー',
    setApiKey: 'APIキーを設定',
    inputApiKey: 'APIキーを入力してください。',
    notSet: '未設定',
    apiKeyIsNotSet:
      'ChatAIの利用を開始するために、OpenAIのAPIキーを設定しましょう。設定画面より設定してください。',
    errorOccurred: 'エラーが発生しました',
    sendMessage: 'メッセージを送信',
    apiKeyDescription: [
      'APIキーを使用すると、アプリはOpenAI APIに直接アクセスするようになります。',
      'APIキーとは、OpenAIのAPIを使用するためのキーです。APIキーはOpenAI Platformから生成することができます。',
      '以下の手順でAPIキーを生成し、コピーしてください。',
      '・https://platform.openai.com からOpenAPIにサインアップする',
      '・https://platform.openai.com/account/api-keys のページでCreate new secret keyを実行',
    ],
    confirmSystemMessage: 'このシステムメッセージを入力しますか？',
  },
});

i18n.locale = getLocales()[0].languageCode;
