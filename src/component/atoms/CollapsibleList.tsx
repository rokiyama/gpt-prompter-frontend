import { SimpleLineIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, SectionList, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

type Props<T> = {
  sections: Array<{
    id: string;
    title: string;
    data: Array<T>;
  }>;
  renderItem: (item: T) => React.ReactElement;
};

export const CollapsibleList = <T extends { id: string }>({
  sections,
  renderItem,
}: Props<T>) => {
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
    <SectionList
      sections={sections}
      extraData={openSectionIds}
      keyExtractor={(item) => item.id}
      renderItem={({ item, section: { id, data }, index }) =>
        openSectionIds.includes(id) ? (
          <View
            style={[
              tw('bg-white mx-3 px-3 py-2'),
              index === 0 && tw('rounded-t-lg'),
              index === data.length - 1 && tw('rounded-b-lg'),
            ]}
          >
            {renderItem(item)}
          </View>
        ) : (
          <></>
        )
      }
      renderSectionHeader={({ section: { id, title } }) => (
        <Pressable onPress={() => toggleSection(id)}>
          <View style={tw('flex-row justify-between items-center mx-3 p-3')}>
            <Text style={tw('text-xl font-bold')}>{title}</Text>
            <SimpleLineIcons
              name={openSectionIds.includes(id) ? 'arrow-down' : 'arrow-right'}
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
  );
};
