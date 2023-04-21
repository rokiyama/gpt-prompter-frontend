import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Chat } from './Chat';
import { OpenAiClientProvider } from '../../context/OpenAiClientProvider';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <OpenAiClientProvider>
      <Chat openSystemMessage={() => navigation.push('SystemMessage')} />
    </OpenAiClientProvider>
  );
};
