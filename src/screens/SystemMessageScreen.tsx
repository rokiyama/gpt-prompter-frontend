import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Card } from '../component/atoms/Card';
import { SystemMessagesModal } from '../component/organisms/SystemMessagesModal';
import { SYSTEM } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addMessages } from '../redux/slices/chatSlice';
import { selectSystemMessages } from '../redux/slices/externalDataSlice';
import { RootStackParamList } from '../types/navigation';
import { uuid } from '../utils/uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'SystemMessage'>;

export const SystemMessageScreen = ({ navigation }: Props) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const systemMessages = useAppSelector(selectSystemMessages);

  return (
    <SafeAreaView style={tw('m-3 flex-1')}>
      <FlatList
        numColumns={2}
        data={systemMessages}
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
                  id: uuid(),
                  createdAt: Date.now(),
                  text: systemMessages[selected].text,
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
        text={selected != null ? systemMessages[selected].text : undefined}
      />
    </SafeAreaView>
  );
};
