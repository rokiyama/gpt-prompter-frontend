import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getLocales } from 'expo-localization';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Card } from '../../component/atoms/Card';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addMessages } from '../../redux/slices/chatSlice';
import { selectSystemMessages } from '../../redux/slices/externalDataSlice';
import { SystemMessage } from '../../types/externalData';
import { RootStackParamList } from '../../types/navigation';
import { newSystemMessage } from '../../utils/message';
import { SystemMessagesModal } from './SystemMessagesModal';
import { TextInputModal } from './TextInputModal';

type Props = NativeStackScreenProps<RootStackParamList, 'SystemMessage'>;

export const SystemMessageScreen = ({ navigation }: Props) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const systemMessages = useAppSelector(selectSystemMessages);
  const [localMessages, setLocalMessages] = useState<Array<SystemMessage>>([]);

  useEffect(() => {
    const locales = getLocales()[0];
    setLocalMessages(
      systemMessages[locales.languageCode] ||
        systemMessages['ja'] ||
        systemMessages['en']
    );
  }, [systemMessages]);

  return (
    <SafeAreaView style={tw('m-3 flex-1')}>
      <View style={tw('m-2 text-slate-400')}>
        <Text>{i18n.t('systemMessageDescription')}</Text>
      </View>
      <View style={tw('bg-white m-2 p-2 rounded-md')}>
        <TextInputModal
          onClose={() => {
            navigation.pop();
          }}
        />
      </View>
      <FlatList
        numColumns={2}
        data={localMessages}
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
              addMessages([newSystemMessage(localMessages[selected].text)])
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
        text={selected != null ? localMessages[selected].text : undefined}
      />
    </SafeAreaView>
  );
};
