import Constants from 'expo-constants';
import { ChatCompletionRequestMessage } from 'openai';
import { useCallback, useState } from 'react';
import { CHAT_AI, SYSTEM } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addMessages, appendLastMessage } from '../redux/slices/chatSlice';
import { selectSettings } from '../redux/slices/settingsSlice';
import { Message } from '../types/chat';
import { WSResponse } from '../types/ws';
import { uuid } from '../utils/uuid';

export const useOpenAI = () => {
  const { userId } = useAppSelector(selectSettings);
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
        sock.send(JSON.stringify({ action: 'message', userId, body }));
      };
      sock.onmessage = (event) => {
        const obj = JSON.parse(event.data);
        console.log('received', obj);
        const parsed = WSResponse.safeParse(obj);
        if (!parsed.success) {
          console.error('parse error', parsed.error, obj);
          return;
        }
        if (parsed.data.error) {
          console.error(parsed.data.error, body);
          setErrorMessage(
            parsed.data.error.code + ':' + parsed.data.error.message
          );
          sock.close();
        }
        if (parsed.data.done) {
          sock.close();
          return;
        }
        if (parsed.data.chunk?.choices.length) {
          dispatch(
            appendLastMessage(parsed.data.chunk?.choices[0].delta.content)
          );
        }
      };
      sock.onclose = () => {
        setSocket(null);
        setLoading(false);
      };
    },
    [dispatch, model, userId]
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
