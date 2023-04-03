import { ReactNode } from 'react';
import { Modal as RNModal, View } from 'react-native';
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
        <View
          style={[
            tw('bg-white m-3 p-5 rounded-md'),
            {
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
};
