import { boolean, object, string } from 'zod';

export const WSResponse = object({
  content: string(),
  done: boolean().optional(),
  error: object({
    code: string(),
    message: string(),
  }).optional(),
});
