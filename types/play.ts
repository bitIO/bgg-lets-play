import { z } from 'zod';

const PlayPlayer = z.object({
  color: z.string(),
  name: z.string(),
  new: z.boolean(),
  rating: z.string(),
  score: z.string(),
  startposition: z.string(),
  userid: z.number(),
  username: z.string(),
  win: z.boolean(),
});
const PlayGame = z.object({
  id: z.number(),
  name: z.string(),
});
const PlaySchema = z.object({
  date: z.string(),
  game: PlayGame,
  id: z.number(),
  length: z.number(),
  location: z.string(),
  players: PlayPlayer.array(),
  quantity: z.number(),
});

export type Play = z.infer<typeof PlaySchema>;
export { PlaySchema };
