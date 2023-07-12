import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { RootStackParamList } from '../../types/navigation';
import { Chat } from './Chat';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const { status, idToken } = useAuth(() => navigation.popToTop());
  useEffect(() => {
    if (status === 'loaded' && !idToken) {
      navigation.push('Auth');
    }
  }, [navigation, status, idToken]);

  return (
    <Chat
      openPrompt={() => navigation.push('Prompt')}
      navigateToAuthScreen={() => navigation.push('Auth')}
    />
  );
};
