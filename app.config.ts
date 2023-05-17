import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'expo-chat-command-gpt',
  slug: 'expo-chat-command-gpt',
  version: '1.0.0',
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
    buildNumber: '19',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'dev.okiyama.expochatcommandgpt',
  },
  plugins: ['expo-localization'],
  extra: {
    appEnv: process.env.APP_ENV,
    backendApiWsUrl:
      process.env.APP_ENV === 'production'
        ? 'wss://56jx8ioa0j.execute-api.ap-northeast-1.amazonaws.com/prod'
        : 'wss://t2v5wu7qle.execute-api.ap-northeast-2.amazonaws.com/dev',
    externalDataUrl: 'https://gpt-chat-misc.vercel.app/prompts.json',
    eas: {
      projectId: '28332568-8713-4a75-bbe1-6cd8ec9fd30b',
    },
  },
});
