import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
} from 'expo-apple-authentication';
import { SafeAreaView, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAuth } from '../../hooks/useAuth';
import { RootStackParamList } from '../../types/navigation';
import { i18n } from '../../i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const AuthScreen = ({ navigation }: Props) => {
  const tw = useTailwind();
  const { status, signIn } = useAuth(navigation.popToTop);

  return (
    <SafeAreaView style={tw('flex-1 justify-center items-center')}>
      {status !== 'loaded' ? (
        <Text>Loading</Text>
      ) : (
        <>
          <Text style={tw('m-10 text-lg')}>{i18n.t('signin')}</Text>
          <AppleAuthenticationButton
            buttonType={AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={tw('w-52 h-11')}
            onPress={signIn}
          />
        </>
      )}
    </SafeAreaView>
  );
};
