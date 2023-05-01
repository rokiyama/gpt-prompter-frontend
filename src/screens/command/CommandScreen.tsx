import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Card } from '../../component/atoms/Card';
import { i18n } from '../../i18n';
import { RootStackParamList } from '../../types/navigation';
import { useCommands } from '../../hooks/useCommands';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  loadExternalData,
  selectLoading,
  setLoading,
} from '../../redux/slices/externalDataSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Command'>;

export const CommandScreen = ({ navigation }: Props) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const { commands } = useCommands();
  const loading = useAppSelector(selectLoading);

  return (
    <SafeAreaView style={tw('m-3 flex-1')}>
      <View style={tw('m-2')}>
        <Text>{i18n.t('commandDescription')}</Text>
      </View>
      <FlatList
        numColumns={2}
        data={commands}
        renderItem={({ item }) => (
          <Card
            style={tw('flex-1')}
            onPress={() => {
              navigation.push('CommandEdit', { id: item.id });
            }}
          >
            <Text style={tw('text-lg font-bold')} numberOfLines={4}>
              {item.title}
            </Text>
          </Card>
        )}
        refreshing={loading}
        onRefresh={() => {
          dispatch(setLoading(true));
          dispatch(loadExternalData());
        }}
      />
    </SafeAreaView>
  );
};
