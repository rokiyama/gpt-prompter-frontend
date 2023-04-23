import { ReactNode, useState } from 'react';
import { Linking, SafeAreaView, Switch, Text, View } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { save, selectSettings } from '../../redux/slices/settingsSlice';
import { ApiKeyModal } from './ApiKeyModal';

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
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const toggle = (value: boolean) => {
    dispatch(
      save({
        ...settings,
        mode: value ? 'apiKey' : 'userId',
      })
    );
  };

  return (
    <SafeAreaView style={tw('m-3')}>
      <View
        style={tw(
          'flex-row items-center justify-between bg-white m-3 p-4 rounded-md'
        )}
      >
        <Text style={tw('m-2')}>{i18n.t('useApiKeyMode')}</Text>
        <Switch value={settings.mode === 'apiKey'} onValueChange={toggle} />
      </View>
      <View style={tw('m-2')}>
        <ListText>{i18n.t('apiKeyDescription')}</ListText>
      </View>
      <View style={tw('bg-white m-3 p-4 rounded-md')}>
        <Text style={tw('m-2')}>{i18n.t('apiKey')}:</Text>
        <Text style={tw('m-2 flex-wrap text-slate-400')}>
          {settings.isApiKeyConfigured
            ? i18n.t('configured')
            : i18n.t('notYetConfigured')}
        </Text>
        <Button
          title={i18n.t('setApiKey')}
          onPress={() => setModalVisible(true)}
          disabled={settings.mode !== 'apiKey'}
        />
        <ApiKeyModal visible={modalVisible} setVisible={setModalVisible} />
      </View>
      <View style={tw('m-2')}>
        <ListText>{i18n.t('apiKeyInstruction.0')}</ListText>
        <ListText>{i18n.t('apiKeyInstruction.1')}</ListText>
        <ListText>{i18n.t('apiKeyInstruction.2')}</ListText>
        <ListText>{i18n.t('apiKeyInstruction.3')}</ListText>
      </View>
    </SafeAreaView>
  );
};
