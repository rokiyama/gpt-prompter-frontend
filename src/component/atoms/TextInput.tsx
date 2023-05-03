import { ForwardedRef, forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

type Props = RNTextInput['props'];

const _TextInput = (
  { style, ...props }: Props,
  ref: ForwardedRef<RNTextInput>
) => {
  const tw = useTailwind();
  return <RNTextInput {...props} ref={ref} style={[style, tw('text-lg')]} />;
};

export const TextInput = forwardRef(_TextInput);

export type TextInput = RNTextInput;
