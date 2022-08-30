import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

import { BggUser } from '../../../../types/bgg';
import { loadUserData } from '../../../../utils/user';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<BggUser | string>,
) => {
  try {
    const { user } = req.query;
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST);
    }
    if (Array.isArray(user)) {
      return res.status(StatusCodes.BAD_REQUEST);
    }
    const userData = await loadUserData(user as string);
    return res.status(StatusCodes.OK).json(userData);
  } catch (error) {
    const { name, message } = error as Error;
    console.error(`BGG-LP: ${name}: ${message}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(message);
  }
};
