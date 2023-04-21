import { array, number, object, string, TypeOf } from 'zod';

export const ApiResponse = object({
  id: string(),
  appVersion: string(),
  error: object({
    code: string(),
    message: string(),
  }).optional(),
  body: object({
    id: string(),
    object: string(),
    created: number(),
    choices: array(
      object({
        index: number().optional(),
        message: object({
          role: string(),
          content: string(),
        }).optional(),
        finish_reason: string().optional(),
      })
    ),
    usage: object({
      prompt_tokens: number(),
      completion_tokens: number(),
      total_tokens: number(),
    }).optional(),
  }).optional(),
});

export type ApiResponse = TypeOf<typeof ApiResponse>;
