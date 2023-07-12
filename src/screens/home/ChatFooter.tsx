import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { i18n } from '../../i18n';
import { useAppSelector } from '../../redux/hooks';
import { selectMessages } from '../../redux/slices/chatSlice';
import { Tutorial } from './Tutorial';

type Props = {
  loading: boolean;
  reset: () => void;
  cancel: () => void;
  resend: () => void;
  openPrompt: () => void;
};

export const ChatFooter = ({
  loading,
  reset,
  cancel,
  resend,
  openPrompt,
}: Props) => {
  const tw = useTailwind();
  const messages = useAppSelector(selectMessages);

  return (
    <View style={tw('flex-row justify-center mb-2')}>
      <Tutorial />
      <Button title={i18n.t('reset')} onPress={reset} />
      {loading && <Button title={i18n.t('cancel')} onPress={cancel} />}
      {!loading && messages.length > 1 && (
        <Button title={i18n.t('resend')} onPress={resend} />
      )}
      {!loading && <Button title={i18n.t('prompt')} onPress={openPrompt} />}
    </View>
  );
};
