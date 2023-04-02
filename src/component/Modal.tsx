import { ReactNode } from 'react';
import { Modal as RNModal, StyleSheet, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  visible: boolean;
  children: ReactNode;
};

export const Modal = ({ visible, children }: Props) => {
  const tw = useTailwind();
  return (
    <RNModal visible={visible} transparent animationType="slide">
      <View style={tw('flex-1 justify-center items-center')}>
        <View style={[tw('bg-white m-5 p-10 rounded-md'), style.shadow]}>
          {children}
        </View>
      </View>
    </RNModal>
  );
};

export const style = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
