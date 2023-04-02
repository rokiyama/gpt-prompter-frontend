import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { randomUUID } from 'expo-crypto';
import { getLocales } from 'expo-localization';
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Card } from '../component/atoms/Card';
import { SystemMessagesModal } from '../component/organisms/SystemMessagesModal';
import { SYSTEM, testdata } from '../constants';
import { useAppDispatch } from '../redux/hooks';
import { addMessages } from '../redux/slices/chatSlice';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SystemMessage'>;

const getTestdata = () => {
  const locales = getLocales();
  return locales.length > 0 && locales[0].languageCode === 'ja'
    ? testdata.ja
    : testdata.en;
};

export const SystemMessageScreen = ({ navigation }: Props) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SafeAreaView style={tw('m-3 flex-1')}>
      <FlatList
        numColumns={2}
        data={getTestdata()}
        renderItem={({ item, index }) => (
          <Card
            style={tw('flex-1')}
            onPress={() => {
              setSelected(index);
              setModalVisible(true);
            }}
          >
            <Text numberOfLines={4}>{item.text}</Text>
          </Card>
        )}
      />
      <SystemMessagesModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onPressOk={() => {
          if (selected != null) {
            dispatch(
              addMessages([
                {
                  id: randomUUID(),
                  createdAt: Date.now(),
                  text: getTestdata()[selected].text,
                  user: SYSTEM,
                  system: true,
                },
              ])
            );
          } else {
            console.error('no items selected');
          }
          setSelected(null);
          navigation.pop();
        }}
        onPressCancel={() => {
          setSelected(null);
        }}
        text={selected != null ? getTestdata()[selected].text : undefined}
      />
    </SafeAreaView>
  );
};
