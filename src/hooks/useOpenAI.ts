import Constants from 'expo-constants';
import { ChatCompletionRequestMessage } from 'openai';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { CHAT_AI, SYSTEM } from '../constants';
import { i18n } from '../i18n';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { save, selectAuth } from '../redux/slices/authSlice';
import { addMessages, appendLastMessage } from '../redux/slices/chatSlice';
import { selectSettings } from '../redux/slices/settingsSlice';
import { Message } from '../types/chat';
import { ApiGwError } from '../types/response';
import { WSResponse } from '../types/ws';
import { uuid } from '../utils/uuid';

export const useOpenAI = () => {
  const { idToken } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { model } = useAppSelector(selectSettings);

  const sendMessages = useCallback(
    async (messages: Array<Message>) => {
      setLoading(true);

      const body = {
        model,
        messages: [
          ...messages.map(
            (m): ChatCompletionRequestMessage => ({
              role:
                m.user.id === CHAT_AI.id
                  ? 'assistant'
                  : m.user.id === SYSTEM.id
                  ? 'system'
                  : 'user',
              content: m.text,
            })
          ),
        ],
      };

      dispatch(
        addMessages([
          {
            id: uuid(),
            text: '',
            createdAt: new Date().getTime(),
            user: CHAT_AI,
          },
        ])
      );

      const sock = new WebSocket(Constants.expoConfig?.extra?.backendApiWsUrl);
      setSocket(sock);
      sock.onopen = () => {
        sock.send(
          JSON.stringify({
            action: 'message',
            idToken,
            body,
          })
        );
      };
      sock.onmessage = (event) => {
        console.log('received', event.data);
        const obj = JSON.parse(event.data);
        const parsed = WSResponse.safeParse(obj);
        if (!parsed.success) {
          const parsedErr = ApiGwError.safeParse(obj);
          if (parsedErr.success) {
            console.log('ApiGwError', parsedErr.data);
            setErrorMessage(parsedErr.data.message);
          } else {
            console.error('parse error', parsed.error, obj);
          }
          return;
        }
        if (parsed.data.error) {
          setLoading(false);
          if (parsed.data.error.code === 'token_limit_exceeded') {
            setErrorMessage(
              i18n.t('errors.limitExceeded') + `(${parsed.data.error.message})`
            );
          } else if (parsed.data.error.code === 'user_will_be_deleted') {
            Alert.alert(
              i18n.t('errorOccurred'),
              i18n.t('errors.userWillBeDeleted')
            );
            dispatch(save({ idToken: '', user: '' }));
          } else {
            console.error(parsed.data.error, body);
            setErrorMessage(
              parsed.data.error.code + ':' + parsed.data.error.message
            );
          }
          sock.close();
          return;
        }
        if (parsed.data.done) {
          sock.close();
          return;
        }
        dispatch(appendLastMessage(parsed.data.content));
      };
      sock.onclose = () => {
        setSocket(null);
        setLoading(false);
      };
    },
    [dispatch, idToken, model]
  );

  const cancel = useCallback(() => {
    socket?.close();
  }, [socket]);

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  return {
    loading,
    errorMessage,
    sendMessages,
    cancel,
    clearError,
  };
};
