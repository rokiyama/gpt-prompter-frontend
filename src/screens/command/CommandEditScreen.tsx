import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { i18n } from '../../i18n';
import { useAppDispatch } from '../../redux/hooks';
import { inputText } from '../../redux/slices/chatSlice';
import { RootStackParamList } from '../../types/navigation';
import { render } from './template';
import { useCommands } from '../../hooks/useCommands';

type Props = NativeStackScreenProps<RootStackParamList, 'CommandEdit'>;

export const CommandEditScreen = ({ navigation, route }: Props) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const { commands } = useCommands();

  const command = commands
    .map((category) => category.data)
    .flat()
    .find((d) => d.id === route.params.id);

  useEffect(() => {
    if (!command) {
      return;
    }
    setOutput(render(command.template, variables));
  }, [command, variables]);

  return (
    <SafeAreaView style={tw('m-3 flex-1')}>
      <View style={tw('m-2')}>
        <Text>{command?.description}</Text>
      </View>
      {command &&
        Object.entries(command.variables).map(([name, placeholder], i) => (
          <InputVariable
            key={i}
            name={name}
            value={variables[name]}
            placeholder={placeholder}
            onChange={(text) => {
              setVariables((v) => ({ ...v, [name]: text }));
            }}
          />
        ))}
      <Text style={tw('m-1 text-lg font-bold')}>コマンド</Text>
      <ScrollView contentContainerStyle={tw('m-1')}>
        <Text style={tw('m-1 text-sm')}>{output}</Text>
      </ScrollView>
      <View style={tw('flex-grow m-2 p-2')}>
        <Button
          title={i18n.t('ok')}
          onPress={() => {
            if (!command) {
              return;
            }
            dispatch(
              inputText(render(command.template, variables, command.variables))
            );
            navigation.popToTop();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const InputVariable = ({
  name,
  value,
  placeholder,
  onChange,
}: {
  name: string;
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
}) => {
  const tw = useTailwind();
  return (
    <View style={tw('flex-row items-center bg-white m-2 p-2 rounded-md')}>
      <Text style={tw('m-1 p-1')}>{name}</Text>
      <TextInput
        style={tw('grow m-1 p-1')}
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  );
};
