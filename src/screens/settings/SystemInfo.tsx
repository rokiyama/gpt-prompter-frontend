import {
  AppleAuthenticationCredentialState,
  getCredentialStateAsync,
} from 'expo-apple-authentication';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button } from '../../component/atoms/Button';
import { Card } from '../../component/atoms/Card';
import { useAuth } from '../../hooks/useAuth';

export const SystemInfo = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();
  const [authState, setAuthState] = useState('');
  return Constants.expoConfig?.extra?.appEnv === 'production' ? (
    <></>
  ) : (
    <>
      <Button
        title="Show system information"
        onPress={() => setVisible(!visible)}
      />
      {visible && (
        <>
          <Card>
            <Text>process.env.NODE_ENV: {process.env.NODE_ENV}</Text>
            <Text>appEnv: {Constants.expoConfig?.extra?.appEnv}</Text>
            <Text>process.env.APP_ENV: {process.env.APP_ENV}</Text>
            <Text>{Constants.expoConfig?.extra?.backendApiWsUrl}</Text>
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
