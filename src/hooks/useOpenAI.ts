import axios from 'axios';
import { randomUUID } from 'expo-crypto';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import { useCallback, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { ChatAI } from '../constants';

export const useOpenAI = (openAI: OpenAIApi | null) => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const sendMessages = useCallback(
    async (newMsgs: Array<IMessage>) => {
      const allMessages = [...messages, ...newMsgs];
      setMessages(allMessages);
      if (!openAI) {
        return;
      }
      setLoading(true);
      const ac = new AbortController();
      setAbortController(ac);
      try {
        const res = await openAI.createChatCompletion(
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              ...[...messages, ...newMsgs].map(
                (m): ChatCompletionRequestMessage => ({
                  role: m.user._id === ChatAI._id ? 'assistant' : 'user',
                  content: m.text,
                })
              ),
            ],
          },
          { signal: ac.signal }
        );
        if (res.data.choices.length !== 1) {
          console.warn('res.data.choices.length !== 1');
          console.log(JSON.stringify(res.data));
        }
        setMessages([
          ...allMessages,
          {
            _id: randomUUID(),
            text: res.data.choices[0].message?.content || '',
            createdAt: new Date(),
            user: ChatAI,
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
      console.log(messages);
    },
    [openAI, messages, setMessages]
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
