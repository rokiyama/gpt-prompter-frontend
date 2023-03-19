import { randomUUID } from 'expo-crypto';
import { speak } from 'expo-speech';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import { useCallback, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { ChatAI } from '../constants';

export const useOpenAI = (openAI: OpenAIApi | null) => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [loading, setLoading] = useState(false);

  const sendMessages = useCallback(
    async (newMsgs: Array<IMessage>) => {
      setMessages([...messages, ...newMsgs]);
      if (!openAI) {
        return;
      }
      setLoading(true);
      try {
        const allMessages = [...messages, ...newMsgs];
        console.log({ messages, newMsgs });
        const res = await openAI.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...allMessages.map(
              (m): ChatCompletionRequestMessage => ({
                role: m.user._id === ChatAI._id ? 'assistant' : 'user',
                content: m.text,
              })
            ),
          ],
        });
        if (res.data.choices.length !== 1) {
          console.error('res.data.choices.length !== 1');
          console.log(res);
          return;
        }
        const answer = {
          _id: randomUUID(),
          text: res.data.choices[0].message?.content || '',
          createdAt: new Date(),
          user: ChatAI,
        };
        console.log(res.data.usage);
        setMessages([...messages, ...newMsgs, answer]);
        speak(answer.text, {
          language: 'ja',
          voice: 'com.apple.ttsbundle.siri_O-ren_ja-JP_compact',
          onError: (err) => {
            console.error(err);
          },
        });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
      console.log(messages);
    },
    [openAI, messages, setMessages]
  );
  return { messages, setMessages, loading, sendMessages };
};
