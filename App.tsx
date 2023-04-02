import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwind-rn';
import { Button } from './src/component/Button';
import { i18n } from './src/i18n';
import { store } from './src/redux/store';
import { HomeScreen } from './src/screens/HomeScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { SystemMessageScreen } from './src/screens/SystemMessageScreen';
import { RootStackParamList } from './src/types/navigation';
import utilities from './tailwind.json';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
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
        <StatusBar style="auto" />
      </TailwindProvider>
    </Provider>
  );
}
