import { useMemo } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useKeyboardHeightContext } from '../../context/KeyboardHeightContext';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';

type Props = {
  text: string;
  visible: boolean;
  okTitle: string;
  cancelTitle: string;
  setText: (text: string) => void;
  setVisible: (visible: boolean) => void;
  onPressOk?: () => void;
  onPressCancel?: () => void;
};

export const TextInputModal = ({
  text,
  visible,
  okTitle,
  cancelTitle,
  setText,
  setVisible,
  onPressOk,
  onPressCancel,
}: Props) => {
  const tw = useTailwind();

  const keyboardHeight = useKeyboardHeightContext();
  const limitHeightOfTextbox: TextInput['props']['style'] = useMemo(() => {
    console.log('keyboardHeight:', keyboardHeight);
    return { height: keyboardHeight - 40 };
  }, [keyboardHeight]);

  return (
    <>
      <Modal visible={visible} disableFrame>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={tw('flex-1 justify-start bg-white')}>
            <View style={tw('justify-start bg-white m-8 p-5 rounded-md')}>
              <TextInput
                multiline
                autoFocus
                onChangeText={setText}
                value={text}
                style={[limitHeightOfTextbox, tw('text-lg')]}
              />
            </View>
            <KeyboardAvoidingView
              style={tw('flex-1 flex-row justify-end mr-8')}
            >
              <Button
                title={cancelTitle}
                onPress={() => {
                  setVisible(false);
                  onPressCancel?.();
                }}
              />
              <Button
                title={okTitle}
                onPress={() => {
                  setVisible(false);
                  onPressOk?.();
                }}
              />
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
