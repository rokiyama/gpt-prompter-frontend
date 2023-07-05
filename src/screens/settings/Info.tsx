import Constants from 'expo-constants';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { Button } from '../../component/atoms/Button';
import {
  AppleAuthenticationCredentialState,
  getCredentialStateAsync,
} from 'expo-apple-authentication';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../component/atoms/Card';

export const Info = () => {
  const [visible, setVisible] = useState(false);
  const tw = useTailwind();
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
            <Text>NODE_ENV: {process.env.NODE_ENV}</Text>
            <Text>appEnv: {Constants.expoConfig?.extra?.appEnv}</Text>
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
          </Card>
        </>
      )}
    </>
  );
};
