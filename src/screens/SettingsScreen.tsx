import { ReactNode, useMemo, useState } from 'react';
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { ApiKeyModal } from '../component/ApiKeyModal';
import { Button } from '../component/Button';
import { i18n } from '../i18n';
import { useAppSelector } from '../redux/hooks';
import { selectApiKey } from '../redux/slices/settingsSlice';
import ParsedText from 'react-native-parsed-text';

const ListText = ({ children }: { children: ReactNode }) => {
  const tw = useTailwind();
  const onPress = (url: string) => {
    Linking.openURL(url);
  };
  return (
    <ParsedText
      style={tw('m-1 flex-wrap text-slate-500')}
      parse={[
        {
          type: 'url',
          style: tw('text-blue-400 underline'),
          onPress,
        },
      ]}
    >
      {children}
    </ParsedText>
  );
};

export const SettingsScreen = () => {
  const tw = useTailwind();
  const [modalVisible, setModalVisible] = useState(false);
  const apiKey = useAppSelector(selectApiKey);
  const masked = useMemo(
    () =>
      apiKey
        ? apiKey.split('').map((c, i) => (i < 3 ? c : '*'))
        : i18n.t('notSet'),
    [apiKey]
  );

  return (
    <SafeAreaView style={tw('m-3')}>
      <Text style={tw('m-2')}>{i18n.t('apiKey')}:</Text>
      <Text style={tw('m-2 flex-wrap text-slate-400')}>{masked}</Text>
      <Button
        title={i18n.t('setApiKey')}
        onPress={() => setModalVisible(true)}
      />
      <ApiKeyModal visible={modalVisible} setVisible={setModalVisible} />
      <View style={tw('mt-4')}>
        <ListText>{i18n.t('apiKeyDescription.0')}</ListText>
        <ListText>{i18n.t('apiKeyDescription.1')}</ListText>
        <ListText>{i18n.t('apiKeyDescription.2')}</ListText>
        <ListText>{i18n.t('apiKeyDescription.3')}</ListText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});
