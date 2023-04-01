import { useMemo, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { ApiKeyModal } from '../component/ApiKeyModal';
import { Button } from '../component/Button';
import { i18n } from '../i18n';
import { useAppSelector } from '../redux/hooks';
import { selectApiKey } from '../redux/slices/settingsSlice';

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
    </SafeAreaView>
  );
};
