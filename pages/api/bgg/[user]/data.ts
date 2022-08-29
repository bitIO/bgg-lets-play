import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

import { BggUser } from '../../../../types/bgg';
import {
  getUser,
  getUserPlays,
  getUserShelve,
} from '../../../../utils/bgg-api';
import { loadFromFile, saveToFile } from '../../../../utils/file';

export default async (req: NextApiRequest, res: NextApiResponse<BggUser>) => {
  const { user } = req.query;
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST);
  }
  if (Array.isArray(user)) {
    return res.status(StatusCodes.BAD_REQUEST);
  }

  const userName = user as string;
  const userDataPath = `./data/${userName}.json`;

  const cachedData = loadFromFile(userDataPath, true);
  if (cachedData) {
    return res.status(StatusCodes.OK).json(cachedData);
  }

  const userData = await getUser(userName as string);
  const userPlays = await getUserPlays(userName as string);
  const uerCollection = await getUserShelve(userName as string, true, true);
  userData.plays = userPlays;
  userData.collection = uerCollection;
  saveToFile(userDataPath, userData, true);
  return res.status(StatusCodes.OK).json(userData);
};
