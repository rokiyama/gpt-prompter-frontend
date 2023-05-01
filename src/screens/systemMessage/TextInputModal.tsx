import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { Modal } from '../../component/atoms/Modal';
import { SYSTEM } from '../../constants';
import { i18n } from '../../i18n';
import { useAppDispatch } from '../../redux/hooks';
import { addMessages } from '../../redux/slices/chatSlice';
import { newSystemMessage } from '../../utils/message';
import { uuid } from '../../utils/uuid';

type Props = {
  onClose: () => void;
};

export const TextInputModal = ({ onClose }: Props) => {
  const tw = useTailwind();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const ref = useRef<TextInput>(null);
  useEffect(() => {
    if (visible) {
      ref.current?.focus();
    }
  }, [visible]);
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        title={i18n.t('inputManually')}
        onPress={() => {
          setVisible(true);
        }}
      />
      <Modal visible={visible} disableFrame>
        <View style={tw('flex-1 justify-start bg-gray-100')}>
          <View style={tw('justify-start bg-white m-8 p-5 rounded-md')}>
            <TextInput
              ref={ref}
              multiline
              onChangeText={setText}
              value={text}
            />
          </View>
          <View style={tw('flex-row justify-end mr-8')}>
            <Button
              title={i18n.t('cancel')}
              onPress={() => {
                setVisible(false);
              }}
            />
            <Button
              title={i18n.t('ok')}
              onPress={() => {
                if (text != null) {
                  dispatch(addMessages([newSystemMessage(text.trim())]));
                }
                setVisible(false);
                onClose();
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
