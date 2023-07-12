import { useCallback, useRef, useState } from 'react';
import { Platform, SafeAreaView, Text, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { USER } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useOpenAI } from '../../hooks/useOpenAI';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addMessages,
  clearMessages,
  inputText,
  selectMessages,
  selectText,
} from '../../redux/slices/chatSlice';
import { toGiftedUser, toIMessage, toMessage } from '../../types/chat';
import { ChatFooter } from './ChatFooter';
import { EditModal } from './EditModal';
import { SendButton } from './SendButton';

type Props = {
  openPrompt: () => void;
  navigateToAuthScreen: () => void;
};

export const Chat = ({ openPrompt, navigateToAuthScreen }: Props) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const text = useAppSelector(selectText);
  const messages = useAppSelector(selectMessages);
  const { loading, sendMessages, cancel, errorMessage, clearError } =
    useOpenAI();
  const { checkToken } = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const giftedChatRef = useRef<GiftedChat>(null);

  const onSend = useCallback(
    (newGiftedMessages: Array<IMessage>) => {
      clearError();
      giftedChatRef.current?.textInput.blur();
      if (!checkToken()) {
        navigateToAuthScreen();
        return;
      }
      const newMessages = newGiftedMessages.map(toMessage);
      dispatch(addMessages(newMessages));
      sendMessages([...messages, ...newMessages]);
    },
    [
      clearError,
      checkToken,
      dispatch,
      sendMessages,
      messages,
      navigateToAuthScreen,
    ]
  );

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      {errorMessage && (
        <View style={tw('flex-1 items-center')}>
          <Text style={tw('text-lg mt-10 text-red-500')}>
            {i18n.t('errorOccurred')}:
          </Text>
          <Text style={tw('text-lg mb-10 text-red-500')}>{errorMessage}</Text>
        </View>
      )}
      {messages.length < 1 && (
        <View style={tw('flex-1 items-center')}>
          <Text style={tw('text-lg mt-10')}>{i18n.t('welcome')}</Text>
        </View>
      )}
      <View style={tw('flex-1')}>
        <GiftedChat
          ref={giftedChatRef}
          messages={messages.slice().reverse().map(toIMessage)}
          text={text}
          onInputTextChanged={(text) => {
            dispatch(inputText(text));
          }}
          onSend={onSend}
          isTyping={loading}
          user={toGiftedUser(USER)}
          placeholder={i18n.t('sendMessage')}
          renderDay={() => <></>}
          renderTime={() => <></>}
          renderSend={(props) => <SendButton {...props} loading={loading} />}
          renderChatFooter={() => (
            <ChatFooter
              loading={loading}
              reset={() => {
                cancel();
                clearError();
                dispatch(clearMessages());
                giftedChatRef.current?.focusTextInput();
              }}
              cancel={cancel}
              resend={() => {
                clearError();
                sendMessages(messages);
              }}
              openPrompt={openPrompt}
            />
          )}
          disableComposer={Platform.OS === 'ios'}
          textInputProps={
            Platform.OS === 'ios'
              ? {
                  onPressIn: () => {
                    setEditModalVisible(true);
                  },
                }
              : undefined
          }
        />
      </View>
      <EditModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        onPressOk={() => {
          console.log('onPressOk');
        }}
      />
    </SafeAreaView>
  );
};
