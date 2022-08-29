import type { NextApiRequest, NextApiResponse } from 'next';
import { BggUser } from '../../../../types/BGG';

export default (req: NextApiRequest, res: NextApiResponse<BggUser>) => {
  res.status(200).json({ name: 'John Doe' });
};
