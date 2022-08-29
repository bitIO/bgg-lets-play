import { getUser, getUserPlays, getUserShelve } from './bgg-api';
import { updateStatistics } from './collection';
import { loadFromFile, saveToFile } from './file';

import { BggUser } from '../types/bgg';

async function saveUserData(userName: string, userData: BggUser) {
  const userDataPath = `./data/${userName}.json`;
  saveToFile(userDataPath, userData, true);
}

async function loadUserData(userName: string) {
  const userDataPath = `./data/${userName}.json`;

  const cachedData = loadFromFile(userDataPath, true);
  if (cachedData) {
    return cachedData;
  }

  const [userData, userPlays, userCollection] = await Promise.all([
    await getUser(userName),
    await getUserPlays(userName),
    await getUserShelve(userName, true, true),
  ]);
  const collectionWithStatistic = await updateStatistics(userCollection);

  userData.plays = userPlays;
  userData.collection = collectionWithStatistic;

  await saveUserData(userName, userData);
  return userData;
}

export { loadUserData, saveUserData };
