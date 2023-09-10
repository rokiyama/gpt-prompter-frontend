import { useRef, useState } from 'react';
import { Platform, SafeAreaView, Text, TextInput, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useTailwind } from 'tailwind-rn';
import { USER } from '../../constants';
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
import { toGiftedUser, toIMessage } from '../../types/chat';
import { uuid } from '../../utils/uuid';
import { ChatFooter } from './ChatFooter';
import { EditModal } from './EditModal';
import { SendButton } from './SendButton';

type Props = {
  openPrompt: () => void;
  navigateToAuthScreen: () => void;
};

export const Chat = ({ openPrompt }: Props) => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const text = useAppSelector(selectText);
  const messages = useAppSelector(selectMessages);
  const { loading, sendMessages, cancel, errorMessage, clearError } =
    useOpenAI();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const giftedInputRef = useRef<TextInput>(null);

  const sendText = () => {
    clearError();
    giftedInputRef.current?.blur();
    const newMessage = {
      id: uuid(),
      text,
      createdAt: new Date().getTime(),
      user: USER,
      system: false,
    };
    dispatch(addMessages([newMessage]));
    sendMessages([...messages, newMessage]);
    dispatch(inputText(''));
  };

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
          textInputRef={giftedInputRef}
          messages={messages.slice().reverse().map(toIMessage)}
          text={text}
          onSend={sendText}
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
                giftedInputRef.current?.focus();
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
        onPressOk={sendText}
      />
    </SafeAreaView>
  );
};
