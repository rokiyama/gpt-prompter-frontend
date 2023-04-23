import { useContext, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { Modal } from '../../component/atoms/Modal';
import { OpenAiClientContext } from '../../context/OpenAiClientProvider';
import { i18n } from '../../i18n';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const ApiKeyModal = ({ visible, setVisible }: Props) => {
  const tw = useTailwind();
  const [text, setText] = useState('');
  const context = useContext(OpenAiClientContext);

  return (
    <Modal visible={visible}>
      <Text style={tw('m-2')}>{i18n.t('inputApiKey')}</Text>
      <TextInput
        style={tw('m-2')}
        onChangeText={setText}
        value={text}
        placeholder="sk-..."
        secureTextEntry
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
            if (!context?.saveApiKey) {
              console.log('context is ', context);
              return;
            }
            context.saveApiKey(text);
            setVisible(false);
            setText('');
          }}
        />
      </View>
    </Modal>
  );
};
