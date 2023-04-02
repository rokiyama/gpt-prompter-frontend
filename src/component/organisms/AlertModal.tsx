import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../atoms/Button';
import { i18n } from '../../i18n';
import { Modal } from '../atoms/Modal';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onPressOk: () => void;
};

export const AlertModal = ({ visible, setVisible, onPressOk }: Props) => {
  const tw = useTailwind();

  return (
    <Modal visible={visible}>
      <Text style={tw('m-2 text-lg')}>{i18n.t('apiKeyIsNotSet')}</Text>
      <View style={tw('flex-row justify-end')}>
        <Button
          title={i18n.t('settings')}
          onPress={() => {
            setVisible(false);
            onPressOk();
          }}
        />
      </View>
    </Modal>
  );
};
