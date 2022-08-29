import {
  BggCollectionParams,
  getBggCollection,
  getBggPlays,
  getBggUser,
} from 'bgg-xml-api-client';

import { BggUser } from '../types/BGG';

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
