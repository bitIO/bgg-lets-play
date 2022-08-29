import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

import { BggUser } from '../../../../types/bgg';
import { loadUserData } from '../../../../utils/user';

export default async (req: NextApiRequest, res: NextApiResponse<BggUser>) => {
  const { user } = req.query;
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST);
  }
  if (Array.isArray(user)) {
    return res.status(StatusCodes.BAD_REQUEST);
  }
  const userData = await loadUserData(user as string);
  return res.status(StatusCodes.OK).json(userData);
};
