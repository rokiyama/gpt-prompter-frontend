import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../component/Button';

export const SettingsScreen = () => {
  const tw = useTailwind();
  const [text, onChangeText] = useState('Text input');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <TextInput onChangeText={onChangeText} value={text} />
      <Button title="Open modal" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={tw('flex-1 justify-center items-center')}>
          <View style={[tw('bg-white m-5 p-10 rounded-md'), style.shadow]}>
            <Text>Hello!</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
