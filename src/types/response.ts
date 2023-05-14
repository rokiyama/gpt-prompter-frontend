import { object, string } from 'zod';

export const ApiGwError = object({
  message: string(),
  connectionId: string(),
  requestId: string(),
});
