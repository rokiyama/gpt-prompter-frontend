import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Configuration, OpenAIApi } from 'openai';
import { useEffect, useRef, useState } from 'react';
import { Platform, SafeAreaView, Text, View } from 'react-native';
import { GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { AlertModal } from '../component/organisms/AlertModal';
import { Button } from '../component/atoms/Button';
import { USER } from '../constants';
import { useOpenAI } from '../hooks/useOpenAI';
import { i18n } from '../i18n';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addMessages, clearMessages } from '../redux/slices/chatSlice';
import { selectApiKey, setApiKey } from '../redux/slices/settingsSlice';
import { toGiftedUser, toIMessage, toMessage } from '../types/chat';
import { RootStackParamList } from '../types/navigation';
import { loadApiKey } from '../utils/apiKeyPersistent';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const tw = useTailwind();
  const [openAI, setOpenAI] = useState<OpenAIApi | null>(null);
  const apiKey = useAppSelector(selectApiKey);
  const dispatch = useAppDispatch();
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const { messages, loading, sendMessages, cancel, errorMessage, clearError } =
    useOpenAI(openAI);

  useEffect(() => {
    (async () => {
      const apiKey = await loadApiKey();
      if (apiKey) {
        dispatch(setApiKey(apiKey));
      } else {
        setAlertModalVisible(true);
      }
    })();
  }, []);

  const giftedChatRef = useRef<GiftedChat>(null);
  useEffect(() => {
    giftedChatRef.current?.focusTextInput();
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    setOpenAI(new OpenAIApi(new Configuration({ apiKey })));
  }, [apiKey]);

  // const { speaking, speak, stop } = useSpeech();
  // const speakLatestMessage = useCallback(() => {
  //   if (messages.length < 2) {
  //     return;
  //   }
  //   const latest = messages[messages.length - 1];
  //   if (latest.user._id !== CHAT_AI._id) {
  //     return;
  //   }
  //   speak(latest.text);
  // }, [messages, speak]);
  // useEffect(() => {
  //   speakLatestMessage();
  // }, [messages, speakLatestMessage]);

  const onSend = (newMessages: Array<IMessage>) => {
    clearError();
    if (!openAI) {
      setAlertModalVisible(true);
      return;
    }
    console.log(newMessages);
    const news = newMessages.map(toMessage);
    const allMessages = [...messages, ...news];
    dispatch(addMessages(news));
    sendMessages(allMessages);
    giftedChatRef.current?.textInput.blur();
  };

  return (
    <SafeAreaView style={tw('flex-1 items-center bg-white')}>
      <AlertModal
        visible={alertModalVisible}
        setVisible={setAlertModalVisible}
        onPressOk={() => navigation.push('Settings')}
      />
      {errorMessage && (
        <View>
          <Text style={tw('text-lg mt-10 text-red-500')}>
            {i18n.t('errorOccurred')}:
          </Text>
          <Text style={tw('text-lg mb-10 text-red-500')}>{errorMessage}</Text>
        </View>
      )}
      {messages.length < 1 && (
        <View>
          <Text style={tw('text-lg mt-10')}>{i18n.t('welcome')}</Text>
        </View>
      )}
      <View style={tw('flex-1 flex-row')}>
        <GiftedChat
          ref={giftedChatRef}
          messages={messages.slice().reverse().map(toIMessage)}
          onSend={onSend}
          isTyping={loading}
          user={toGiftedUser(USER)}
          placeholder={i18n.t('sendMessage')}
          renderSend={(props) => (
            <Send {...props}>
              <View style={tw('m-2')}>
                <Ionicons
                  name="send"
                  size={25}
                  color={Platform.OS === 'android' ? '#2196F3' : '#007AFF'}
                />
              </View>
            </Send>
          )}
          renderChatFooter={() => (
            <View style={tw('flex-row justify-center mb-2')}>
              <Button
                title={i18n.t('reset')}
                onPress={() => {
                  clearError();
                  dispatch(clearMessages());
                  giftedChatRef.current?.focusTextInput();
                }}
              />
              {loading && (
                <Button title={i18n.t('cancel')} color="red" onPress={cancel} />
              )}
              {/* {speaking && <Button title="Stop" color="red" onPress={stop} />}
            {!loading && !speaking && messages.length > 2 && (
              <Button title="Replay" onPress={speakLatestMessage} />
            )} */}
              {!loading && /*!speaking &&*/ messages.length > 1 && (
                <Button
                  title={i18n.t('resend')}
                  onPress={() => {
                    clearError();
                    sendMessages(messages);
                  }}
                />
              )}
              {!loading && (
                <Button
                  title={i18n.t('systemMessage')}
                  onPress={() => navigation.push('SystemMessage')}
                />
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
