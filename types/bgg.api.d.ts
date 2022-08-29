export interface ValueObject {
  value: string;
}

export interface BggApiResponseDataUser {
  avatarlink: ValueObject;
  battlenetaccount: ValueObject;
  country: ValueObject;
  firstname: ValueObject;
  id: string;
  lastlogin: ValueObject;
  lastname: ValueObject;
  marketrating: ValueObject;
  name: string;
  psnaccount: ValueObject;
  stateorprovince: ValueObject;
  steamaccount: ValueObject;
  termsofuse: string;
  traderating: ValueObject;
  webaddress: ValueObject;
  wiiaccount: ValueObject;
  xboxaccount: ValueObject;
  yearregistered: ValueObject;
}

export interface BggApiResponseDataUserPlays {
  page: string;
  play: BggApiResponseDataUserPlaysItem[];
  termsofuse: string;
  total: string;
  userid: string;
  username: string;
}

export interface BggApiResponseDataUserPlaysItem {
  date: string;
  id: string;
  incomplete: string;
  item: BggApiResponseDataUserPlaysItemGame;
  length: string;
  location: string;
  players:
    | BggApiResponseDataUserPlaysItemPlayer
    | BggApiResponseDataUserPlaysItemPlayer[];
  quantity: string;
}

export interface BggApiResponseDataUserPlaysItemGame {
  name: string;
  objectid: string;
  objecttype: string;
  subtypes: {
    subtype: ValueObject;
  };
}

export interface BggApiResponseDataUserPlaysItemPlayer {
  color: string;
  name: string;
  new: string;
  rating: string;
  score: string;
  startposition: string;
  userid: string;
  username: string;
  win: string;
}
