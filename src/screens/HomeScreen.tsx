import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { increment, selectCount } from '../redux/slices/exampleSlice';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({}: Props) => {
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
