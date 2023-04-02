import { ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../atoms/Button';
import { i18n } from '../../i18n';
import { Modal } from '../atoms/Modal';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onPressOk: () => void;
  onPressCancel: () => void;
  text?: string;
};

export const SystemMessagesModal = ({
  visible,
  setVisible,
  onPressOk,
  onPressCancel,
  text,
}: Props) => {
  const tw = useTailwind();

  return (
    <Modal visible={visible}>
      <Text style={tw('m-2 text-lg')}>{i18n.t('confirmSystemMessage')}</Text>
      <ScrollView style={tw('flex-grow-0')}>
        <Text style={tw('m-2 text-sm')}>{text}</Text>
      </ScrollView>
      <View style={tw('flex-row justify-end')}>
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
            onPressOk();
          }}
        />
      </View>
    </Modal>
  );
};
