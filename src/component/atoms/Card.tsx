import { ReactNode } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children: ReactNode;
};

export const Card = ({ style: propStyle, onPress, children }: Props) => {
  const tw = useTailwind();
  const style = [
    propStyle,
    tw('bg-white m-2 p-3 rounded-lg'),
    {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.02,
      shadowRadius: 4,
      elevation: 1,
    },
  ];
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={style}>{children}</View>
  );
};
