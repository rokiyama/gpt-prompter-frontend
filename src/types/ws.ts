import { any, array, boolean, number, object, string, TypeOf } from 'zod';

export const WSResponse = object({
  chunk: object({
    id: string(),
    object: string(),
    created: number(),
    model: string(),
    choices: array(
      object({
        delta: object({
          content: string(),
        }),
        index: number(),
        finish_reason: string().nullable(),
      })
    ),
  }).optional(),
  done: boolean(),
});

export type WSResponse = TypeOf<typeof WSResponse>;
