import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getNotPlayedGamesTogether } from '../../../utils/collection';
import { loadUserData } from '../../../utils/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { users } = req.query;
  if (!users) {
    return res.status(StatusCodes.BAD_REQUEST);
  }
  const userNames = (users as string).split(',');
  if (userNames.length < 2) {
    return res.status(StatusCodes.BAD_REQUEST);
  }
  const usersData = await Promise.all(
    userNames.map((userName) => {
      return loadUserData(userName);
    }),
  );
  const notPlayedGames = getNotPlayedGamesTogether(usersData);
  return res.json(notPlayedGames);
};
