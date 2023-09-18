import {
  AppleAuthenticationCredentialState,
  getCredentialStateAsync,
} from 'expo-apple-authentication';
import * as Updates from 'expo-updates';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button } from '../../component/atoms/Button';
import { Card } from '../../component/atoms/Card';
import { useAuth } from '../../hooks/useAuth';

export const SystemInfo = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();
  const [authState, setAuthState] = useState('');

  if (process.env.EXPO_PUBLIC_APP_ENV === 'production') {
    if (Updates.channel === 'production') {
      return <></>;
    }
    if (Updates.channel === 'preview') {
      return (
        <Card>
          <Variables />
        </Card>
      );
    }
  }

  return (
    <>
      <Button
        title="Show system information"
        onPress={() => setVisible(!visible)}
      />
      {visible && (
        <>
          <Card>
            <Variables />
          </Card>
          <Card>
            <Button
              title="Check auth state"
              onPress={async () => {
                const state = await getCredentialStateAsync(user);
                switch (state) {
                  case AppleAuthenticationCredentialState.REVOKED:
                    setAuthState('REVOKED');
                    break;
                  case AppleAuthenticationCredentialState.AUTHORIZED:
                    setAuthState('AUTHORIZED');
                    break;
                  case AppleAuthenticationCredentialState.NOT_FOUND:
                    setAuthState('NOT_FOUND');
                    break;
                  case AppleAuthenticationCredentialState.TRANSFERRED:
                    setAuthState('TRANSFERRED');
                    break;

                  default:
                    setAuthState(`unknown state: ${state}`);
                    break;
                }
              }}
            />
            <Text>authState: {authState}</Text>
            <Text>user: {user}</Text>
          </Card>
        </>
      )}
    </>
  );
};

const Variables = () => {
  return (
    <>
      <Text>NODE_ENV: {process.env.NODE_ENV}</Text>
      <Text>EXPO_PUBLIC_APP_ENV: {process.env.EXPO_PUBLIC_APP_ENV}</Text>
      <Text>Updates.channel: {Updates.channel}</Text>
      <Text>Updates.runtimeVersion: {Updates.runtimeVersion}</Text>
    </>
  );
};
