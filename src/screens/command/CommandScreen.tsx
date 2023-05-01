import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Card } from '../../component/atoms/Card';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectSystemMessages } from '../../redux/slices/externalDataSlice';
import { RootStackParamList } from '../../types/navigation';
import { testdata } from './testdata';

type Props = NativeStackScreenProps<RootStackParamList, 'Command'>;

export const CommandScreen = ({ navigation }: Props) => {
  const tw = useTailwind();
  const [selected, setSelected] = useState<string | null>(null);
  const templates = testdata;

  return (
    <SafeAreaView style={tw('m-3 flex-1')}>
      <View style={tw('m-2 text-slate-400')}>
        <Text>{i18n.t('commandDescription')}</Text>
      </View>
      <FlatList
        numColumns={2}
        data={templates}
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
      />
    </SafeAreaView>
  );
};
