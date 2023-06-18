import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationCredentialState,
  AppleAuthenticationScope,
  getCredentialStateAsync,
  signInAsync,
} from 'expo-apple-authentication';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { save, selectSettings } from '../../redux/slices/settingsSlice';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthTest'>;

export const AuthTestScreen = ({ navigation }: Props) => {
  const tw = useTailwind();
  const [loading, setLoading] = useState(true);
  const [credential, setCredential] =
    useState<AppleAuthenticationCredentialState | null>(null);
  useEffect(() => {
    getCredentialStateAsync('001520.aacb700afb0241918d7236416ebf4854.0211')
      .then((c) => {
        setCredential(c);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setCredential(null);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={tw('m-3')}>
      {loading ? (
        <Text>Loading</Text>
      ) : credential ? (
        <Text>{credential}</Text>
      ) : (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={tw('w-52 h-11')}
          onPress={async () => {
            try {
              const credential = await signInAsync({
                requestedScopes: [
                  AppleAuthenticationScope.FULL_NAME,
                  AppleAuthenticationScope.EMAIL,
                ],
              });
              // signed in
              console.log('🔑 credential', credential);
            } catch (e) {
              if (
                e &&
                typeof e === 'object' &&
                'code' in e &&
                e.code === 'ERR_REQUEST_CANCELED'
              ) {
                // handle that the user canceled the sign-in flow
                console.log('login canceled');
              } else {
                // handle other errors
                console.error('🤔 Unknown error', e);
              }
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};
