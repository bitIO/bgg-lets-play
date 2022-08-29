import {
  BggCollectionParams,
  getBggCollection,
  getBggPlays,
  getBggThing,
  getBggUser,
} from 'bgg-xml-api-client';

import { BggCollection, BggGame, BggPlay, BggUser } from '../types/bgg';
import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggAPIResponseDataGameItem,
  BggAPIResponseDataGameItemNameType,
  BggApiResponseDataUserPlays,
  BggApiResponseDataUserPlaysItem,
} from '../types/bgg-api';

async function getUser(userName: string): Promise<BggUser> {
  const response = await getBggUser({
    name: userName,
  });
  const { data } = response;
  const user: BggUser = {
    avatar: data.avatarlink.value,
    firstName: data.firstname.value,
    id: parseInt(data.id, 10),
    lastName: data.lastname.value,
    userName: data.name,
  };
  return user;
}

function parseUserPlayItem(play: BggApiResponseDataUserPlaysItem): BggPlay {
  return {
    date: new Date(play.date),
    game: {
      id: parseInt(play.item.objectid, 10),
      images: {
        image: '',
        thumbnail: '',
      },
      name: play.item.name,
    },
    id: parseInt(play.id, 10),
    length: parseInt(play.length, 10),
    location: play.location,
    players: Array.isArray(play.players.player)
      ? play.players.player.map((player) => {
          return {
            color: player.color,
            name: player.name,
            new: player.new ? player.new === '1' : undefined,
            rating: player.rating,
            score: player.score,
            startposition: player.startposition,
            userid: player.userid ? parseInt(player.userid, 10) : undefined,
            username: player.username,
            win: player.win ? player.win === '1' : undefined,
          };
        })
      : [
          {
            color: play.players.player.color,
            name: play.players.player.name,
            new: play.players.player.new
              ? play.players.player.new === '1'
              : undefined,
            rating: play.players.player.rating,
            score: play.players.player.score,
            startposition: play.players.player.startposition,
            userid: play.players.player.userid
              ? parseInt(play.players.player.userid, 10)
              : undefined,
            username: play.players.player.username,
            win: play.players.player.win
              ? play.players.player.win === '1'
              : undefined,
          },
        ],
    quantity: parseInt(play.quantity, 10),
  };
}
async function getUserPlays(userName: string): Promise<BggPlay[]> {
  const response = await getBggPlays({
    page: 1,
    username: userName,
  });

  const data: BggPlay[] = [];
  const responseData = response.data as BggApiResponseDataUserPlays;
  responseData.play.forEach((play) => {
    data.push(parseUserPlayItem(play));
  });
  const total = parseInt(responseData.total, 10);
  if (total - 100 > 0) {
    const remainingPages = Math.ceil((total - 100) / 100);
    const promises = [];
    for (let index = 0; index < remainingPages; index += 1) {
      promises.push(
        getBggPlays({
          page: index + 2,
          username: userName,
        }),
      );
    }
    const remainingPagesResponseData = await Promise.all(promises);
    remainingPagesResponseData.forEach((pageResponseData) => {
      (pageResponseData.data as BggApiResponseDataUserPlays).play.forEach(
        (play) => {
          data.push(parseUserPlayItem(play));
        },
      );
    });
  }

  return data;
}

async function getUserShelve(
  username: string,
  owned: boolean,
  excludeExpansions: boolean,
): Promise<BggCollection> {
  const params: BggCollectionParams = {
    subtype: 'boardgame',
    username,
  };
  if (excludeExpansions) {
    params.excludesubtype = 'boardgameexpansion';
  }

  if (owned) {
    params.own = 1;
  } else {
    params.own = 0;
  }

  const response = await getBggCollection(params);
  const data = response.data as BggApiResponseDataCollection;
  const collection: BggCollection = {
    games: data.item.map((item) => {
      return {
        id: parseInt(item.objectid, 10),
        images: {
          image: item.image,
          thumbnail: item.thumbnail,
        },
        name: item.name.text,
        plays: item.numplays,
        publishedYear: item.yearpublished,
      };
    }),
    publicationDate: new Date(data.pubdate),
    totalItems: parseInt(data.totalitems, 10),
  };

  return collection;
}

async function getGamesInfo(ids: number[]): Promise<BggGame[]> {
  const response = await getBggThing({
    id: ids,
    stats: 1,
  });

  const data = response.data as BggAPIResponseDataGame;

  if (ids.length === 1) {
    const item = data.item as BggAPIResponseDataGameItem;
    const primaryName = Array.isArray(item.name)
      ? item.name.find((nameItem) => {
          return nameItem.type === BggAPIResponseDataGameItemNameType.Primary;
        })
      : item.name;
    return [
      {
        id: parseInt(item.id, 10),
        images: {
          image: item.image,
          thumbnail: item.thumbnail,
        },
        market: {
          owned: parseInt(item.statistics.ratings.owned.value, 10),
          trading: parseInt(item.statistics.ratings.trading.value, 10),
          wanting: parseInt(item.statistics.ratings.wanting.value, 10),
          whishing: parseInt(item.statistics.ratings.wishing.value, 10),
        },
        name: primaryName?.value || 'Primary name not found',
        publishedYear: parseInt(item.yearpublished.value, 10),
        stats: {
          comments: parseInt(item.statistics.ratings.numcomments.value, 10),
          rating: parseFloat(item.statistics.ratings.average.value),
          weight: parseFloat(item.statistics.ratings.averageweight.value),
        },
      },
    ];
  }

  const gamesInfo: BggGame[] = [];
  (data.item as BggAPIResponseDataGameItem[]).forEach((item) => {
    const primaryName = Array.isArray(item.name)
      ? item.name.find((nameItem) => {
          return nameItem.type === BggAPIResponseDataGameItemNameType.Primary;
        })
      : item.name;
    gamesInfo.push({
      id: parseInt(item.id, 10),
      images: {
        image: item.image,
        thumbnail: item.thumbnail,
      },
      market: {
        owned: parseInt(item.statistics.ratings.owned.value, 10),
        trading: parseInt(item.statistics.ratings.trading.value, 10),
        wanting: parseInt(item.statistics.ratings.wanting.value, 10),
        whishing: parseInt(item.statistics.ratings.wishing.value, 10),
      },
      name: primaryName?.value || 'Primary name not found',
      publishedYear: parseInt(item.yearpublished.value, 10),
      stats: {
        comments: parseInt(item.statistics.ratings.numcomments.value, 10),
        rating: parseFloat(item.statistics.ratings.average.value),
        weight: parseFloat(item.statistics.ratings.averageweight.value),
      },
    });
  });
  return gamesInfo;
}

export { getGamesInfo, getUser, getUserPlays, getUserShelve };
