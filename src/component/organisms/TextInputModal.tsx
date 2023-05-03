import { useEffect, useMemo, useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useKeyboardHeightContext } from '../../context/KeyboardHeightContext';
import { i18n } from '../../i18n';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';
import { TextInput } from '../atoms/TextInput';

type Props = {
  text: string;
  setText: (text: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onPressOk?: () => void;
  onPressCancel?: () => void;
};

export const TextInputModal = ({
  text,
  setText,
  visible,
  setVisible,
  onPressOk,
  onPressCancel,
}: Props) => {
  const tw = useTailwind();
  const ref = useRef<TextInput>(null);
  useEffect(() => {
    if (visible) {
      ref.current?.focus();
    }
  }, [visible]);

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
                ref={ref}
                multiline
                onChangeText={setText}
                value={text}
                style={[limitHeightOfTextbox, tw('text-xl')]}
              />
            </View>
            <KeyboardAvoidingView
              style={tw('flex-1 flex-row justify-end mr-8')}
            >
              <Button
                title={i18n.t('cancel')}
                onPress={() => {
                  setVisible(false);
                  onPressCancel?.();
                }}
              />
              <Button
                title={i18n.t('ok')}
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
