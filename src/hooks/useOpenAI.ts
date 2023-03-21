import axios from 'axios';
import { randomUUID } from 'expo-crypto';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import { useCallback, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { CHAT_AI, FIRST_MESSAGE, SYSTEM } from '../constants';

export const useOpenAI = (openAI: OpenAIApi | null) => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const sendMessages = useCallback(
    async (messages: Array<IMessage>) => {
      if (!openAI) {
        return;
      }
      setLoading(true);
      const ac = new AbortController();
      setAbortController(ac);
      const content = [
        ...[...messages.filter((m) => m._id !== FIRST_MESSAGE._id)].map(
          (m): ChatCompletionRequestMessage => ({
            role:
              m.user._id === CHAT_AI._id
                ? 'assistant'
                : m.user._id === SYSTEM._id
                ? 'system'
                : 'user',
            content: m.text,
          })
        ),
      ];
      console.log(content);
      try {
        const res = await openAI.createChatCompletion(
          {
            model: 'gpt-3.5-turbo',
            messages: content,
          },
          { signal: ac.signal }
        );
        if (res.data.choices.length !== 1) {
          console.warn('res.data.choices.length !== 1');
          console.log(JSON.stringify(res.data));
        }
        setMessages([
          ...messages,
          {
            _id: randomUUID(),
            text: res.data.choices[0].message?.content || '',
            createdAt: new Date(),
            user: CHAT_AI,
          },
        ]);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          console.error(err);
        }
      }
      setLoading(false);
    },
    [openAI, setMessages]
  );

  const cancel = useCallback(() => {
    if (abortController == null) {
      console.error('abortController is null');
      return;
    }
    abortController.abort();
  }, [abortController]);

  return {
    messages,
    setMessages,
    loading,
    sendMessages,
    cancel,
  };
};
