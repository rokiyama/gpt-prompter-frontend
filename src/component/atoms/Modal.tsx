import { ReactNode } from 'react';
import { Modal as RNModal, Platform, SafeAreaView, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  visible: boolean;
  children: ReactNode;
};

const ModalContent = ({ children }: { children: ReactNode }) => {
  const tw = useTailwind();
  if (Platform.OS === 'android') {
    return (
      <SafeAreaView style={tw('flex-1 justify-center items-center')}>
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
      </SafeAreaView>
    );
  }
  return (
    <View style={tw('flex-1 flex-grow justify-start bg-gray-100')}>
      <View style={tw('flex-1 bg-white m-8 p-5 rounded-md')}>{children}</View>
    </View>
  );
};

export const Modal = ({ visible, children }: Props) => {
  const tw = useTailwind();
  return (
    <RNModal
      visible={visible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : undefined}
    >
      <ModalContent>{children}</ModalContent>
    </RNModal>
  );
};
