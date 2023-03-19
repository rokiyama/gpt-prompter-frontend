import { Button, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { increment, selectCount } from '../redux/slices/exampleSlice';
import { useTailwind } from 'tailwind-rn';

export const HomeScreen = () => {
  const tw = useTailwind();
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <View style={tw('flex-1 items-center justify-center')}>
      <Text>{count}</Text>
      <Button
        title="Increment"
        onPress={() => {
          dispatch(increment());
        }}
      />
    </View>
  );
};
