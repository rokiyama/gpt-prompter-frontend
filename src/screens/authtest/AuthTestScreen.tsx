import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  signInAsync,
} from 'expo-apple-authentication';
import { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { load, save, selectAuth } from '../../redux/slices/authSlice';

// type Props = NativeStackScreenProps<RootStackParamList, 'AuthTest'>;

export const AuthTestScreen = () => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  useEffect(() => {
    if (auth.status === 'loading') return;
    if (auth.status === 'uninitialized') {
      dispatch(load());
      return;
    }

    // const a = async () => {
    //   if (auth.user && auth.idToken) {
    //     const credState = await getCredentialStateAsync(auth.user);
    //     if (credState === AppleAuthenticationCredentialState.AUTHORIZED) {
    //       console.log('authenticated');
    //     } else {
    //       console.log('credState:', credState);
    //       console.log('unauthenticated');
    //     }
    //   } else {
    //     console.log('auth.idToken or auth.user is empty');
    //     console.log('unauthenticated');
    //   }
    // };
    // a();
  }, [auth.idToken, auth.status, auth.user, dispatch]);

  return (
    <SafeAreaView style={tw('m-3')}>
      <Text>auth.idToken={auth.idToken}</Text>
      {auth.status !== 'loaded' ? (
        <Text>Loading</Text>
      ) : (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={tw('w-52 h-11')}
          onPress={async () => {
            try {
              const credential = await signInAsync();
              //{
              // requestedScopes: [
              // AppleAuthenticationScope.FULL_NAME,
              // AppleAuthenticationScope.EMAIL,
              // ],
              // }

              // signed in
              console.log('🔑 credential', credential);
              dispatch(
                save({
                  idToken: credential.identityToken || '',
                  user: credential.user,
                })
              );

              // debug(credential);
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

// async function debug(cred: AppleAuthenticationCredential) {
//   console.log('debug');
//   const res = await axios
//     .post('http://localhost:8080', null, {
//       headers: { token: cred.identityToken },
//     })
//     .catch(console.error);
//   console.log(res);
// }
