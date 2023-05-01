import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto';
import { Button } from '../component/atoms/Button';
import { useSettings } from '../hooks/useSettings';
import { useExternalData } from '../hooks/useExternalData';
import { i18n } from '../i18n';
import { CommandEditScreen } from '../screens/command/CommandEditScreen';
import { CommandScreen } from '../screens/command/CommandScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { SystemMessageScreen } from '../screens/systemMessage/SystemMessageScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  useSettings();
  useExternalData();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: '',
            headerLeft: () => (
              <Button
                title={i18n.t('systemMessage')}
                onPress={() => navigation.push('SystemMessage')}
              />
            ),
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
        <Stack.Screen
          name="Command"
          component={CommandScreen}
          options={{ headerTitle: i18n.t('command') }}
        />
        <Stack.Screen
          name="CommandEdit"
          component={CommandEditScreen}
          options={{ headerTitle: i18n.t('commandEdit') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
