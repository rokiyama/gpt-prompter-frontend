import { SimpleLineIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, SafeAreaView, SectionList, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { RootStackParamList } from '../../types/navigation';

const DATA = [
  {
    id: '1',
    title: 'カテゴリ1',
    data: ['アイテム1', 'アイテム2', 'アイテム3'],
  },
  {
    id: '2',
    title: 'カテゴリ2',
    data: ['アイテム4', 'アイテム5', 'アイテム6'],
  },
  {
    id: '3',
    title: 'カテゴリ3',
    data: ['アイテム7', 'アイテム8', 'アイテム9'],
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;

export const TestScreen = (props: Props) => {
  const tw = useTailwind();
  const [openSectionIds, setOpenSections] = useState<Array<string>>([]);

  const toggleSection = (sectionId: string) => {
    const open = openSectionIds.includes(sectionId);
    if (open) {
      setOpenSections(openSectionIds.filter((id) => id !== sectionId));
    } else {
      setOpenSections([...openSectionIds, sectionId]);
    }
  };

  return (
    <SafeAreaView style={tw('flex-1')}>
      <SectionList
        sections={DATA}
        extraData={openSectionIds}
        keyExtractor={(item) => item}
        renderItem={({ item, section: { id, data }, index }) =>
          openSectionIds.includes(id) ? (
            <View
              style={[
                tw('bg-white mx-3 px-3 py-1'),
                index === 0 && tw('rounded-t-lg'),
                index === data.length - 1 && tw('rounded-b-lg'),
              ]}
            >
              <Text style={tw('text-lg')}>{item}</Text>
            </View>
          ) : (
            <></>
          )
        }
        renderSectionHeader={({ section: { id, title } }) => (
          <Pressable onPress={() => toggleSection(id)}>
            <View
              style={[
                tw('flex-row justify-between items-center'),
                tw('mx-3 p-3'),
              ]}
            >
              <Text style={tw('text-xl font-bold')}>{title}</Text>
              <SimpleLineIcons
                name={
                  openSectionIds.includes(id) ? 'arrow-down' : 'arrow-right'
                }
                size={12}
                color="black"
              />
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => (
          <View style={tw('bg-gray-100 h-px mx-3')} />
        )}
      />
    </SafeAreaView>
  );
};
