import Constants from 'expo-constants';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { Button } from '../../component/atoms/Button';

export const Info = () => {
  const [visible, setVisible] = useState(false);
  const tw = useTailwind();
  return Constants.expoConfig?.extra?.appEnv === 'production' ? (
    <></>
  ) : (
    <>
      <Button
        title="Show system information"
        onPress={() => setVisible(!visible)}
      />
      {visible && (
        <View style={tw('bg-white m-3 p-4 rounded-md')}>
          <Text>NODE_ENV: {process.env.NODE_ENV}</Text>
          <Text>appEnv: {Constants.expoConfig?.extra?.appEnv}</Text>
          <Text>{Constants.expoConfig?.extra?.backendApiWsUrl}</Text>
        </View>
      )}
    </>
  );
};
