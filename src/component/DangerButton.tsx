import { Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props = {
  title?: string;
  onPress?: () => void;
};

export const DangerButton = ({ title, onPress }: Props) => {
  const tw = useTailwind();
  return (
    <TouchableOpacity
      style={[tw('p-2 m-1 rounded bg-current bg-red-500')]}
      onPress={onPress}
    >
      <Text style={tw('text-white')}>{title}</Text>
    </TouchableOpacity>
  );
};
