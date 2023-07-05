export const GPT_MODELS = [
  'gpt-4',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
] as const;

export type GptModel = (typeof GPT_MODELS)[number];
