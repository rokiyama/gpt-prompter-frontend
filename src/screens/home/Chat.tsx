import { Ionicons } from '@expo/vector-icons';
import { useCallback, useRef } from 'react';
import { Platform, SafeAreaView, Text, View } from 'react-native';
import { GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { Button } from '../../component/atoms/Button';
import { USER } from '../../constants';
import { useOpenAI } from '../../hooks/useOpenAI';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addMessages,
  clearMessages,
  selectMessages,
} from '../../redux/slices/chatSlice';
import { toGiftedUser, toIMessage, toMessage } from '../../types/chat';

type Props = {
  openSystemMessage: () => void;
};

export const Chat = ({ openSystemMessage }: Props) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const { loading, sendMessages, cancel, errorMessage, clearError } =
    useOpenAI();

  const giftedChatRef = useRef<GiftedChat>(null);

  const onSend = useCallback(
    (newGiftedMessages: Array<IMessage>) => {
      clearError();
      giftedChatRef.current?.textInput.blur();
      const newMessages = newGiftedMessages.map(toMessage);
      dispatch(addMessages(newMessages));
      sendMessages([...messages, ...newMessages]);
    },
    [dispatch, clearError, sendMessages, messages]
  );

  return (
    <SafeAreaView style={tw('flex-1 items-center bg-white')}>
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
          renderDay={() => <></>}
          renderTime={() => <></>}
          renderSend={(props) => (
            <Send {...props} disabled={loading}>
              <View style={tw('m-2')}>
                <Ionicons
                  name="send"
                  size={25}
                  color={
                    loading
                      ? '#AAAAAA'
                      : Platform.OS === 'android'
                      ? '#2196F3'
                      : '#007AFF'
                  }
                />
              </View>
            </Send>
          )}
          renderChatFooter={() => (
            <View style={tw('flex-row justify-center mb-2')}>
              <Button
                title={i18n.t('reset')}
                onPress={() => {
                  cancel();
                  clearError();
                  dispatch(clearMessages());
                  giftedChatRef.current?.focusTextInput();
                }}
              />
              {loading && (
                <Button title={i18n.t('cancel')} color="red" onPress={cancel} />
              )}
              {!loading && messages.length > 1 && (
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
                  onPress={openSystemMessage}
                />
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
