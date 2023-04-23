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
  const context = useContext(OpenAiClientContext);

  const sendMessages = useCallback(
    async (messages: Array<Message>) => {
      setLoading(true);
      const ac = new AbortController();
      setAbortController(ac);
      const axiosOpts = { signal: ac.signal };
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
          answer = res.data;
        } else {
          const res = await axios.post(
            Constants.expoConfig?.extra?.backendApiUrl,
            { userId, body },
            axiosOpts
          );
          console.log('backendApi result', res.data);
          const parsed = ApiResponse.parse(res.data);
          if (parsed.error) {
            setErrorMessage(`[${parsed.error.code}] ${parsed.error.message}`);
            setLoading(false);
            return;
          }
          answer = parsed.body;
        }
        if (answer) {
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
