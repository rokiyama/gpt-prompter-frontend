import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { Chat } from './Chat';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation, route }: Props) => {
  return <Chat openCommand={() => navigation.push('Command')} />;
};
