import { memo } from 'react';
import { Button as RNButton, View, ButtonProps, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = Pick<ButtonProps, 'title' | 'onPress' | 'color'>;

export const Button = memo(function Button({ title, onPress, color }: Props) {
  const tw = useTailwind();
  return (
    <View style={Platform.OS === 'android' && tw('m-1 px-1')}>
      <RNButton title={title} onPress={onPress} color={color} />
    </View>
  );
});