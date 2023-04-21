import axios from 'axios';
import Constants from 'expo-constants';
import { ChatCompletionRequestMessage } from 'openai';
import { useCallback, useContext, useState } from 'react';
import { CHAT_AI, SYSTEM } from '../constants';
import { OpenAiClientContext } from '../context/OpenAiClientProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addMessages, selectMessages } from '../redux/slices/chatSlice';
import { selectSettings } from '../redux/slices/settingsSlice';
import { Message } from '../types/chat';
import { ApiResponse } from '../types/response';

export const useOpenAI = () => {
  const messages = useAppSelector(selectMessages);
  const { userId, mode } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const openAiClient = useContext(OpenAiClientContext);

  const sendMessages = useCallback(
    async (messages: Array<Message>) => {
      setLoading(true);
      const ac = new AbortController();
      setAbortController(ac);
      const body = {
        model: 'gpt-3.5-turbo',
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
      let answer: ApiResponse['body'];
      try {
        if (mode === 'apiKey') {
          if (!openAiClient) {
            setErrorMessage('openAiClient is null');
            return;
          }
          const res = await openAiClient.createChatCompletion(body, {
            signal: ac.signal,
          });
          answer = res.data;
        } else {
          const res = await axios.post(
            Constants.expoConfig?.extra?.apiUrl,
            {
              userId,
              body,
            },
            { signal: ac.signal }
          );
          const parsed = ApiResponse.parse(res.data);
          console.log(parsed);
          answer = parsed.body;
        }
        if (answer.choices.length !== 1) {
          console.warn('res.data.choices.length !== 1');
        }
        dispatch(
          addMessages([
            {
              id: answer.id,
              text: answer.choices[0].message?.content || '',
              createdAt: Date.now(),
              user: CHAT_AI,
            },
          ])
        );
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
    [dispatch, openAiClient, mode, userId]
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
