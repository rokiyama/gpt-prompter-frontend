import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { Modal } from '../../component/atoms/Modal';
import { i18n } from '../../i18n';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onPressOk: (text: string) => void;
  onPressCancel: () => void;
};

export const TextInputModal = ({
  visible,
  setVisible,
  onPressOk,
  onPressCancel,
}: Props) => {
  const tw = useTailwind();
  const [text, setText] = useState('');
  const ref = useRef<TextInput>(null);
  useEffect(() => {
    if (visible) {
      ref.current?.focus();
    }
  }, [visible]);

  return (
    <Modal visible={visible} disableFrame>
      <View style={tw('flex-1 justify-start bg-gray-100')}>
        <View style={tw('justify-start bg-white m-8 p-5 rounded-md')}>
          <TextInput ref={ref} multiline onChangeText={setText} value={text} />
        </View>
        <View style={tw('flex-row justify-end mr-8')}>
          <Button
            title={i18n.t('cancel')}
            onPress={() => {
              setVisible(false);
              onPressCancel();
            }}
          />
          <Button
            title={i18n.t('ok')}
            onPress={() => {
              setVisible(false);
              onPressOk(text);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
