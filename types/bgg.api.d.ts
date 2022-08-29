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

export interface BggApiResponseDataCollection {
  item: BggApiResponseDataCollectionItem[];
  pubdate: string;
  termsofuse: string;
  totalitems: string;
}

export interface BggApiResponseDataCollectionItem {
  collid: string;
  image: string;
  name: BggApiResponseDataCollectionItemName;
  numplays: number;
  objectid: string;
  objecttype: string;
  status: BggApiResponseDataCollectionItemStatus;
  subtype: string;
  thumbnail: string;
  yearpublished: number;
}

export interface BggApiResponseDataCollectionItemName {
  sortindex: string;
  text: string;
}

export interface BggApiResponseDataCollectionItemStatus {
  fortrade: string;
  lastmodified: string;
  own: string;
  preordered: string;
  prevowned: string;
  want: string;
  wanttobuy: string;
  wanttoplay: string;
  wishlist: string;
}
