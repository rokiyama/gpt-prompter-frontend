import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

export const i18n = new I18n({
  en: {
    welcome: "Let's talk about something.",
    systemMessage: 'System message',
    reset: 'Reset',
    cancel: 'Cancel',
    resend: 'Resend',
  },
  ja: {
    welcome: '何か話してみましょう。',
    systemMessage: 'システムメッセージ',
    reset: 'リセット',
    cancel: '中断',
    resend: '再送信',
  },
});

i18n.locale = getLocales()[0].languageCode;
