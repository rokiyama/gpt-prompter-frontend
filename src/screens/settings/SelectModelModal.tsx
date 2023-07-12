import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { Modal } from '../../component/atoms/Modal';
import { i18n } from '../../i18n';
import { GPT_MODELS, GptModel } from '../../types/openAI';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  select: (model: GptModel) => void;
};

export const SelectModelModal = ({ visible, setVisible, select }: Props) => {
  const tw = useTailwind();

  return (
    <Modal visible={visible}>
      <Text style={tw('text-lg')}>{i18n.t('selectModel')}:</Text>
      <View>
        {GPT_MODELS.map((model) => (
          <Button
            key={model}
            title={model}
            onPress={() => {
              setVisible(false);
              select(model);
            }}
          />
        ))}
      </View>
    </Modal>
  );
};
