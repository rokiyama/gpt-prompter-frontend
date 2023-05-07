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
    configured: 'Configured',
    notYetConfigured: 'Not yet configured',
    apiKey: 'API Key',
    setApiKey: 'Set API Key',
    inputApiKey: 'Input API Key.',
    notSet: 'Not set',
    apiKeyIsNotSet:
      'API key is not set. Please set it from the settings screen.',
    errorOccurred: 'An error has occurred',
    sendMessage: 'Send a message',
    apiKeyDescription:
      'By default, the app calls the OpenAI API via the server; the API key allows the app to access the OpenAI API directly, without going through the server.',
    apiKeyInstruction: [
      'The API key gives the app direct access to the OpenAI API.',
      "An API key is a key used to access OpenAI's API. An API key can be generated from the OpenAI Platform.",
      'Please follow the steps below to generate and copy the API key.',
      '- Sign up for OpenAPI at https://platform.openai.com .',
      "- Execute 'Create new secret key' on the page https://platform.openai.com/account/api-keys .",
    ],
    systemMessageDescription:
      'System messages are used to give instructions to the assistant.',
    inputManually: 'Input manually',
    confirmSystemMessage: 'Are you sure you want to enter this system message?',
    gptModel: 'Model',
    changeModel: 'Change model',
    selectModel: 'Select model',
    prompt: 'Prompt',
    promptEdit: 'Edit prompt',
    promptDescription:
      'Create a prompt to give to the assistant based on the template.',
    promptEditDescription:
      'Default values are automatically entered where omitted.',
    errors: {
      limitExceeded:
        'You have reached the daily character limit. We apologize for the inconvenience. Please try again tomorrow or later.',
    },
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
    configured: '設定済み',
    notYetConfigured: '未設定',
    apiKey: 'APIキー',
    setApiKey: 'APIキーを設定',
    inputApiKey: 'APIキーを入力してください。',
    notSet: '未設定',
    apiKeyIsNotSet:
      'ChatAIの利用を開始するために、OpenAIのAPIキーを設定しましょう。設定画面より設定してください。',
    errorOccurred: 'エラーが発生しました',
    sendMessage: 'メッセージを送信',
    apiKeyDescription:
      '通常、アプリはサーバ経由でOpenAIのAPIを呼び出します。APIキーを使用すると、アプリはサーバを経由せず、OpenAI APIに直接アクセスするようになります。',
    apiKeyInstruction: [
      'APIキーとは、OpenAIのAPIを使用するためのキーです。APIキーはOpenAI Platformから生成することができます。',
      '以下の手順でAPIキーを生成し、コピーしてください。',
      '・https://platform.openai.com からOpenAPIにサインアップする',
      '・https://platform.openai.com/account/api-keys のページでCreate new secret keyを実行',
    ],
    systemMessageDescription:
      'システムメッセージは、アシスタントに対してシステムから指示を行うためのものです。AIの口調、スタイルなどを操作することができます。',
    inputManually: 'テキスト入力で指定',
    confirmSystemMessage: 'このシステムメッセージを入力しますか？',
    gptModel: 'モデル',
    changeModel: 'モデルを変更',
    selectModel: 'モデルを選択してください',
    prompt: 'プロンプト',
    promptEdit: 'プロンプト編集',
    promptDescription:
      'テンプレートをもとに、アシスタントに与えるプロンプトを作成します。',
    promptEditDescription: '省略した箇所はデフォルト値が自動入力されます。',
    errors: {
      limitExceeded:
        '1日あたりの文字数上限に達しました。恐れ入りますが、明日以降に再度お試しください。',
    },
  },
});

i18n.locale = getLocales()[0].languageCode;
