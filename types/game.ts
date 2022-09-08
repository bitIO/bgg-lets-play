import { z } from 'zod';

const GameImages = z.object({
  image: z.string().url(),
  thumbnail: z.string().url(),
});
const GameInfo = z.object({
  maxPlayTime: z.number(),
  maxPlayers: z.number(),
  minPlayTime: z.number(),
  minPlayers: z.number(),
  numOwners: z.number(),
  playingTime: z.number(),
  weight: z.number().optional(),
});
const GameMarket = z.object({
  owned: z.number(),
  trading: z.number(),
  wanting: z.number(),
  whishing: z.number(),
});
const GameRating = z.object({
  average: z.number().nullish(),
  bayesaverage: z.number().nullish(),
  median: z.number().nullish(),
  stddev: z.number().nullish(),
  users: z.number().nullish(),
  value: z.number().nullish(),
});
const GameStatsSchema = z.object({
  comments: z.number(),
  rating: GameRating,
  weight: z.number().optional(),
});
const GameSchema = z.object({
  id: z.number(),
  images: GameImages,
  info: GameInfo,
  market: GameMarket.nullish(),
  name: z.string(),
  publishedYear: z.number().nullish(),
  stats: GameStatsSchema,
});

export type Game = z.infer<typeof GameSchema>;
export { GameSchema };
export type GameStats = z.infer<typeof GameStatsSchema>;
