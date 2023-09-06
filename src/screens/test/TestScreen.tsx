import { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';

// type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;

export const TestScreen = () => {
  const tw = useTailwind();
  const [count, setCount] = useState(0);
  const add = (a: number) => (b: number) => a + b;
  const increment = add(1);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(increment)} />
    </SafeAreaView>
  );
};
