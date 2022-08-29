import {
  BggCollectionParams,
  getBggCollection,
  getBggPlays,
  getBggUser,
} from 'bgg-xml-api-client';

import { BggPlays, BggShelve, BggUser } from '../types/BGG';
import {
  BggApiResponseDataCollection,
  BggApiResponseDataUserPlays,
  BggApiResponseDataUserPlaysItem,
} from '../types/bgg.api';

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

function parseUserPlayItem(play: BggApiResponseDataUserPlaysItem) {
  return {
    date: new Date(play.date),
    game: {
      id: parseInt(play.item.objectid, 10),
      images: {
        image: '',
        thumbnail: '',
      },
      name: play.item.name,
      plays: -1,
      publishedYear: -1,
      rating: -1,
    },
    id: parseInt(play.id, 10),
    length: parseInt(play.length, 10),
    location: play.location,
    quantity: parseInt(play.quantity, 10),
  };
}
async function getUserPlays(userName: string): Promise<BggPlays> {
  const response = await getBggPlays({
    page: 1,
    username: userName,
  });

  const data: BggPlays = {
    plays: [],
    total: -1,
  };
  const responseData = response.data as BggApiResponseDataUserPlays;
  data.total = parseInt(responseData.total, 10);
  responseData.play.forEach((play) => {
    data.plays.push(parseUserPlayItem(play));
  });
  if (data.total - 100 > 0) {
    const remainingPages = Math.ceil((data.total - 100) / 100);
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
          data.plays.push(parseUserPlayItem(play));
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
): Promise<BggShelve> {
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
  const shelve: BggShelve = {
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
        rating: -1,
      };
    }),
    publicationDate: new Date(data.pubdate),
    totalItems: parseInt(data.totalitems, 10),
  };

  return shelve;
}

export { getUserShelve, getUser, getUserPlays };
