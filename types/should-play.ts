import { z } from 'zod';

import { GameSchema } from './game';
import { PlaySchema } from './play';

const ShouldPlayEntrySchema = z.object({
  game: GameSchema,
  plays: PlaySchema.array(),
});
const ShouldPlaySchema = ShouldPlayEntrySchema.array();

export type ShouldPlay = z.infer<typeof ShouldPlayEntrySchema>;
export { ShouldPlayEntrySchema, ShouldPlaySchema };
