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
  View,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../component/Button';
import { Modal } from '../component/Modal';
import { SYSTEM, testdata } from '../constants';
import { i18n } from '../i18n';
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
          <TouchableOpacity
            onPress={() => {
              setSelected(index);
              setModalVisible(true);
            }}
            style={[tw('flex-1 bg-white m-5 p-4 rounded-lg'), style.shadow]}
          >
            <Text numberOfLines={4}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible}>
        <Text style={tw('m-2 text-lg')}>{i18n.t('confirmSystemMessage')}</Text>
        <Text style={tw('m-2 text-sm')} numberOfLines={16}>
          {selected != null && getTestdata()[selected].text}
        </Text>
        <View style={tw('flex-row justify-end')}>
          <Button
            title={i18n.t('cancel')}
            onPress={() => {
              setModalVisible(false);
              setSelected(null);
            }}
          />
          <Button
            title={i18n.t('ok')}
            onPress={() => {
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
              setModalVisible(false);
              setSelected(null);
              navigation.pop();
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export const style = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
});
