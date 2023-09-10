import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'AI Prompt',
  slug: 'expo-chat-command-gpt',
  version: '1.0.4',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    config: {
      usesNonExemptEncryption: false,
    },
    bundleIdentifier: 'dev.okiyama.expochatcommandgpt',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'dev.okiyama.expochatcommandgpt',
  },
  plugins: ['expo-localization', 'expo-apple-authentication'],
  extra: {
    appEnv: process.env.APP_ENV,
    backendApiWsUrl:
      process.env.APP_ENV === 'production'
        ? 'wss://iqr221x15j.execute-api.ap-northeast-1.amazonaws.com/prod'
        : 'wss://fzo2wqjdv4.execute-api.ap-northeast-2.amazonaws.com/dev',
    backendApiDeleteAccountUrl:
      process.env.APP_ENV === 'production'
        ? 'https://i985f7f83d.execute-api.ap-northeast-1.amazonaws.com/reserve-user-deletion'
        : 'https://9t4hypjwxh.execute-api.ap-northeast-2.amazonaws.com/reserve-user-deletion',
    externalDataUrl: 'https://gpt-chat-misc.vercel.app/prompts.json',
    eas: {
      projectId: '28332568-8713-4a75-bbe1-6cd8ec9fd30b',
    },
  },
});
