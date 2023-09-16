import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';

// type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;

export const TestScreen = () => {
  const tw = useTailwind();
  const [count, setCount] = useState(1);
  const add = (a: number) => (b: number) => a + b;
  const increment = add(1);

  return (
    <SafeAreaView style={tw('flex-1 items-center')}>
      <View style={tw('flex-1 justify-end')}>
        <Text>{count}</Text>
      </View>
      <View style={tw('flex-1')}>
        <Button title="Increment" onPress={() => setCount(increment)} />
      </View>
    </SafeAreaView>
  );
};
