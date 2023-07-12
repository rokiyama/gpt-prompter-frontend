import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { CollapsibleList } from '../../component/atoms/CollapsibleList';
import { RootStackParamList } from '../../types/navigation';

const DATA = [
  {
    id: '1',
    title: 'カテゴリ1',
    data: [
      { id: '1', text: 'アイテム1' },
      { id: '2', text: 'アイテム2' },
      { id: '3', text: 'アイテム3' },
    ],
  },
  {
    id: '2',
    title: 'カテゴリ2',
    data: [
      { id: '4', text: 'アイテム4' },
      { id: '5', text: 'アイテム5' },
      { id: '6', text: 'アイテム6' },
    ],
  },
  {
    id: '3',
    title: 'カテゴリ3',
    data: [
      { id: '7', text: 'アイテム7' },
      { id: '8', text: 'アイテム8' },
      { id: '9', text: 'アイテム9' },
    ],
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;

export const TestScreen = ({ route }: Props) => {
  const tw = useTailwind();
  const [openSectionIds, setOpenSectionIds] = useState<Array<string>>(['2']);
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Text>{route.name}</Text>
      <Text>refresh count:{count}</Text>
      <CollapsibleList
        sections={DATA}
        openSectionIds={openSectionIds}
        setOpenSectionIds={setOpenSectionIds}
        renderItem={(item) => (
          <TouchableOpacity>
            <Text style={tw('text-lg')}>{item.text}</Text>
          </TouchableOpacity>
        )}
        refreshing={false}
        onRefresh={() => setCount(count + 1)}
      />
    </SafeAreaView>
  );
};
