import { z } from 'zod';

export const ApiResponse = z.object({
  id: z.string(),
  appVersion: z.string(),
  body: z.object({
    id: z.string(),
    object: z.string(),
    created: z.number(),
    choices: z.array(
      z.object({
        index: z.number().optional(),
        message: z
          .object({
            role: z.string(),
            content: z.string(),
          })
          .optional(),
        finish_reason: z.string().optional(),
      })
    ),
    usage: z
      .object({
        prompt_tokens: z.number(),
        completion_tokens: z.number(),
        total_tokens: z.number(),
      })
      .optional(),
  }),
});

export type ApiResponse = z.infer<typeof ApiResponse>;
