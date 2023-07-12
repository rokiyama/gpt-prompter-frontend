import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { IMessage, Send, SendProps } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { PRIMARY_COLOR } from '../../constants';

type Props = {
  loading: boolean;
} & SendProps<IMessage>;

export const SendButton = ({ loading, ...props }: Props) => {
  const tw = useTailwind();
  return (
    <Send {...props} disabled={loading}>
      <View style={tw('m-2')}>
        <Ionicons
          name="send"
          size={25}
          color={loading ? '#AAAAAA' : PRIMARY_COLOR}
        />
      </View>
    </Send>
  );
};
