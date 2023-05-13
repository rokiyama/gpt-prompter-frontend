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
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
    bundleIdentifier: 'dev.okiyama.expochatcommandgpt',
    buildNumber: '11',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'dev.okiyama.expochatcommandgpt',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-localization'],
  extra: {
    backendApiWsUrl:
      process.env.NODE_ENV === 'production'
        ? 'wss://56jx8ioa0j.execute-api.ap-northeast-1.amazonaws.com/prod'
        : 'wss://08tuojhmfg.execute-api.ap-northeast-2.amazonaws.com/dev',
    externalDataUrl: 'https://gpt-chat-misc.vercel.app/prompts.json',
    eas: {
      projectId: '28332568-8713-4a75-bbe1-6cd8ec9fd30b',
    },
  },
});
