import { memo } from 'react';
import { ButtonProps, Platform, Button as RNButton, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = Pick<ButtonProps, 'title' | 'onPress' | 'disabled' | 'color'>;

export const Button = memo(function Button({
  title,
  onPress,
  disabled,
  color,
}: Props) {
  const tw = useTailwind();
  return (
    <View style={Platform.OS === 'android' && tw('m-1 px-1')}>
      <RNButton
        title={title}
        onPress={onPress}
        disabled={disabled}
        color={color}
      />
    </View>
  );
});
