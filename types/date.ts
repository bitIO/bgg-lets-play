import { z } from 'zod';

const DateSchema = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) {
    return new Date(arg);
  }
  return arg;
}, z.date());

export type Date = z.infer<typeof DateSchema>;
export { DateSchema };
