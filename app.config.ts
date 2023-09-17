import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'AI Prompt',
  slug: 'expo-chat-command-gpt',
  owner: 'okiyama',
  version: '1.0.5',
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
    eas: {
      projectId: '28332568-8713-4a75-bbe1-6cd8ec9fd30b',
    },
  },
  updates: {
    url: 'https://u.expo.dev/28332568-8713-4a75-bbe1-6cd8ec9fd30b',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
});
