import { BggCollection } from '../../types/bgg';
import { getGamesInfo } from '../bgg-api';

async function updateStatistics(collection: BggCollection) {
  const updatedCollection: BggCollection = {
    ...collection,
  };
  const ids = collection.games.map((game) => {
    return game.id;
  });
  const gamesInfo = await getGamesInfo(ids);
  gamesInfo.forEach((gameInfo) => {
    const collectionGameData = updatedCollection.games.find((game) => {
      return game.id === gameInfo.id;
    });
    if (collectionGameData) {
      if (gameInfo.market) {
        collectionGameData.market = gameInfo.market;
      }
      if (gameInfo.stats) {
        collectionGameData.stats = gameInfo.stats;
      }
    }
  });
  return updatedCollection;
}

export { updateStatistics };
