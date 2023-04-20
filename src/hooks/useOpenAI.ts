import axios from 'axios';
import { uuid } from '../utils/uuid';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import { useCallback, useState } from 'react';
import { CHAT_AI, SYSTEM } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addMessages, selectMessages } from '../redux/slices/chatSlice';
import { Message } from '../types/chat';

export const useOpenAI = (openAI: OpenAIApi | null) => {
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const sendMessages = useCallback(
    async (messages: Array<Message>) => {
      if (!openAI) {
        console.error('openAI client is null');
        return;
      }
      setLoading(true);
      const ac = new AbortController();
      setAbortController(ac);
      const content = [
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
      ];
      try {
        const res = await openAI.createChatCompletion(
          {
            model: 'gpt-3.5-turbo',
            messages: content,
            max_tokens: 200,
          },
          { signal: ac.signal }
        );
        if (res.data.choices.length !== 1) {
          console.warn('res.data.choices.length !== 1');
          console.log(JSON.stringify(res.data));
        }
        dispatch(
          addMessages([
            {
              id: uuid(),
              text: res.data.choices[0].message?.content || '',
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
    [openAI, dispatch]
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
