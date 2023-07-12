import { TextInputModal } from '../../component/organisms/TextInputModal';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { inputText, selectText } from '../../redux/slices/chatSlice';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onPressOk: () => void;
};

export const EditModal = ({ visible, setVisible, onPressOk }: Props) => {
  const dispatch = useAppDispatch();
  const text = useAppSelector(selectText);

  return (
    <TextInputModal
      text={text}
      visible={visible}
      okTitle={i18n.t('sendMessage')}
      cancelTitle={i18n.t('close')}
      setText={(text) => dispatch(inputText(text))}
      setVisible={setVisible}
      onPressOk={() => {
        if (text) {
          onPressOk();
        }
      }}
    />
  );
};
