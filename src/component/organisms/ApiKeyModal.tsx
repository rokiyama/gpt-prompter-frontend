import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { save, selectSettings } from '../../redux/slices/settingsSlice';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const ApiKeyModal = ({ visible, setVisible }: Props) => {
  const tw = useTailwind();
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  console.log('settings:', settings);

  return (
    <Modal visible={visible}>
      <Text style={tw('m-2')}>{i18n.t('inputApiKey')}</Text>
      <TextInput
        style={tw('m-2')}
        onChangeText={setText}
        value={text}
        placeholder="sk-..."
        multiline
      />
      <View style={tw('flex-row justify-end')}>
        <Button
          title={i18n.t('cancel')}
          onPress={() => {
            setVisible(false);
            setText('');
          }}
        />
        <Button
          title={i18n.t('ok')}
          onPress={() => {
            dispatch(
              save({
                ...settings,
                apiKey: text,
              })
            );
            setVisible(false);
            setText('');
          }}
        />
      </View>
    </Modal>
  );
};
