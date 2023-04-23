import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto';
import { Button } from '../component/atoms/Button';
import { OpenAiClientProvider } from '../context/OpenAiClientProvider';
import { useSettings } from '../hooks/useSettings';
import { useSystemMessages } from '../hooks/useSystemMessages';
import { i18n } from '../i18n';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { SystemMessageScreen } from '../screens/systemMessage/SystemMessageScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  useSettings();
  useSystemMessages();
  return (
    <OpenAiClientProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerTitle: 'ChatAI',
              headerRight: () => (
                <Button
                  title={i18n.t('settings')}
                  onPress={() => navigation.push('Settings')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerTitle: i18n.t('settings') }}
          />
          <Stack.Screen
            name="SystemMessage"
            component={SystemMessageScreen}
            options={{ headerTitle: i18n.t('systemMessage') }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OpenAiClientProvider>
  );
};
