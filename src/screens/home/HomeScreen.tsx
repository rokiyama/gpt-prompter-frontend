import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { Chat } from './Chat';
import { useCheckUpdate } from '../../hooks/useCheckUpdate';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  useCheckUpdate();

  return (
    <Chat
      openPrompt={() => navigation.push('Prompt')}
      navigateToAuthScreen={() => navigation.push('Auth')}
    />
  );
};
