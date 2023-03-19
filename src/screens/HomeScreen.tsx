import { Button, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { increment, selectCount } from '../redux/slices/exampleSlice';

export const HomeScreen = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <>
      <Text>{count}</Text>
      <Button
        title="Increment"
        onPress={() => {
          dispatch(increment());
        }}
      />
    </>
  );
};
