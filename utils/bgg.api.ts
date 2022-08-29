import {
  BggCollectionParams,
  getBggCollection,
  getBggPlays,
  getBggUser,
} from 'bgg-xml-api-client';

import { BggPlays, BggUser } from '../types/BGG';
import {
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

