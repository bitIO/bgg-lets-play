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

export interface BggAPIResponseDataGame {
  item: BggAPIResponseDataGameItem | BggAPIResponseDataGameItem[];
  termsofuse: string;
}

export interface BggAPIResponseDataGameItem {
  description: string;
  id: string;
  image: string;
  link: BggAPIResponseDataGameItemLink[];
  maxplayers: ValueObject;
  maxplaytime: ValueObject;
  minage: ValueObject;
  minplayers: ValueObject;
  minplaytime: ValueObject;
  name: BggAPIResponseDataGameItemName | BggAPIResponseDataGameItemName[];
  playingtime: ValueObject;
  poll: BggAPIResponseDataGameItemPoll[];
  statistics: BggAPIResponseDataGameStats;
  thumbnail: string;
  type: string;
  yearpublished: ValueObject;
}

export interface BggAPIResponseDataGameItemLink {
  id: string;
  inbound?: string;
  type: string;
  value: string;
}

export interface BggAPIResponseDataGameItemName {
  sortindex: string;
  type: BggAPIResponseDataGameItemNameType;
  value: string;
}

export enum BggAPIResponseDataGameItemNameType {
  Alternate = 'alternate',
  Primary = 'primary',
}

export interface BggAPIResponseDataGameItemPoll {
  name: string;
  results: BggAPIResponseDataGameItemPollResult;
  title: string;
  totalvotes: string;
}

export interface BggAPIResponseDataGameItemPollResult {
  numplayers?: string;
  result: BggAPIResponseDataGameItemPollResultItem[];
}

export interface BggAPIResponseDataGameItemPollResultItem {
  level?: string;
  numvotes: string;
  value: string;
}

export interface BggAPIResponseDataGameStats {
  page: string;
  ratings: BggAPIResponseDataGameStatsRatings;
}

export interface BggAPIResponseDataGameStatsRatings {
  average: ValueObject;
  averageweight: ValueObject;
  bayesaverage: ValueObject;
  median: ValueObject;
  numcomments: ValueObject;
  numweights: ValueObject;
  owned: ValueObject;
  ranks: BggAPIResponseDataGameStatsRatingsRanks;
  stddev: ValueObject;
  trading: ValueObject;
  usersrated: ValueObject;
  wanting: ValueObject;
  wishing: ValueObject;
}

export interface BggAPIResponseDataGameStatsRatingsRanks {
  rank: BggAPIResponseDataGameStatsRatingsRanksItem[];
}

export interface BggAPIResponseDataGameStatsRatingsRanksItem {
  bayesaverage: string;
  friendlyname: string;
  id: string;
  name: string;
  type: string;
  value: string;
}
