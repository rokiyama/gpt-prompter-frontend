import axios from 'axios';
import Constants from 'expo-constants';
import { ChatCompletionRequestMessage } from 'openai';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CHAT_AI, SYSTEM } from '../constants';
import { OpenAiClientContext } from '../context/OpenAiClientProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addMessages,
  selectMessages,
  appendLastMessage,
} from '../redux/slices/chatSlice';
import { selectSettings } from '../redux/slices/settingsSlice';
import { Message } from '../types/chat';
import { ApiResponse } from '../types/response';
import { WSResponse } from '../types/ws';
import { uuid } from '../utils/uuid';

export const useOpenAI = () => {
  const messages = useAppSelector(selectMessages);
  const { userId, mode } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const context = useContext(OpenAiClientContext);

  const sendMessages = useCallback(
    async (messages: Array<Message>) => {
      setLoading(true);
      const ac = new AbortController();
      setAbortController(ac);
      const axiosOpts = { signal: ac.signal };
      const body = {
        model: 'gpt-4',
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
      try {
        if (mode === 'apiKey') {
          if (!context?.openAiClient) {
            setErrorMessage('openAiClient is null');
            setLoading(false);
            return;
          }
          const res = await context.openAiClient.createChatCompletion(
            body,
            axiosOpts
          );
          console.log('openAi result', res);
          const answer = res.data;
          if (answer.choices.length !== 1) {
            console.warn('res.data.choices.length !== 1');
          }
          dispatch(
            addMessages([
              {
                id: answer.id,
                text: answer.choices[0].message?.content || '',
                createdAt: answer.created * 1000,
                user: CHAT_AI,
              },
            ])
          );
        } else {
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
          console.log(
            'new socket',
            Constants.expoConfig?.extra?.backendApiWsUrl
          );
          const socket = new WebSocket(
            Constants.expoConfig?.extra?.backendApiWsUrl
          );
          console.log('addEventListener');
          socket.onmessage = (event) => {
            // setMessages((current) => [...current, event.data]);
            const obj = JSON.parse(event.data);
            const parsed = WSResponse.parse(obj);
            if (parsed.done) {
              socket.close();
            }
            if (parsed.chunk?.choices.length) {
              dispatch(
                appendLastMessage(parsed.chunk?.choices[0].delta.content)
              );
            }
          };
          socket.onopen = () => {
            const req = JSON.stringify({ action: 'message', userId, body });
            console.log('send', req);
            socket.send(req);
          };
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else if (axios.isAxiosError(err)) {
          console.error('axiosError', err);
          setErrorMessage(
            `${err.message}\n${err.response?.data?.error?.message}`
          );
        } else {
          console.error(err);
          setErrorMessage(String(err));
        }
      }
      setLoading(false);
    },
    [dispatch, context, mode, userId]
  );

  const cancel = useCallback(() => {
    if (abortController == null) {
      console.error('abortController is null');
      return;
    }
    abortController.abort();
  }, [abortController]);

  const clearError = useCallback(() => {
    setErrorMessage('');
  }, []);

  return {
    messages,
    loading,
    sendMessages,
    cancel,
    errorMessage,
    clearError,
  };
};
