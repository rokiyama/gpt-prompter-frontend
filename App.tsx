import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwind-rn';
import { store } from './src/redux/store';
import { HomeScreen } from './src/screens/HomeScreen';
import utilities from './tailwind.json';

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <HomeScreen />
        <StatusBar style="auto" />
      </TailwindProvider>
    </Provider>
  );
}
