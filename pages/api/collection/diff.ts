import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getNotPlayedGamesTogether } from '../../../utils/collection';
import { loadUserData } from '../../../utils/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { users, sortBy } = req.query;
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
  if (sortBy === 'rating') {
    return res.json(
      notPlayedGames.sort((a, b) => {
        if (!a.game.stats || !b.game.stats) {
          return 0;
        }
        if (a.game.stats?.rating > b.game.stats?.rating) {
          return -1;
        }
        if (a.game.stats?.rating < b.game.stats?.rating) {
          return 1;
        }
        return 0;
      }),
    );
  }
  return res.json(notPlayedGames);
};
