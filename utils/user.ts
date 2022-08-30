import { getUser, getUserPlays, getUserShelve } from './bgg-api';
import { updateStatistics } from './collection';

import { getDatabase } from '../database';
import { BggUser } from '../types/bgg';

const database = getDatabase();

async function saveUserData(userData: BggUser) {
  database.saveUser(userData);
}

async function loadUserData(userName: string): Promise<BggUser> {
  const cachedData = database.loadUser(userName);
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

  await saveUserData(userData);
  return userData;
}

export { loadUserData, saveUserData };
