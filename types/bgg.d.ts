export interface BggCollection {
  games: BggGame[];
  publicationDate: Date;
  totalItems: number;
}

export interface BggGame {
  id: number;
  images?: BggGameImage;
  market?: BggGameMarket;
  name: string;
  plays?: number;
  publishedYear: number;
  stats?: BggGameStats;
}

export interface BggGameStats {
  comments: number;
  rating: number;
  weight: number;
}

export interface BggGameMarket {
  owned: number;
  trading: number;
  wanting: number;
  whishing: number;
}

export interface BggGameImage {
  image: string;
  thumbnail: string;
}

export interface BggUser {
  avatar?: string;
  firstName: string;
  id: number;
  lastName: string;
  plays?: BggPlays;
  shelve?: BggShelve;
  userName: string;
}

export interface BggPlays {
  plays: BggPlay[];
  total: number;
}

export interface BggPlay {
  date: Date;
  game: BggGame;
  id: number;
  length: number;
  location: string;
  quantity: number;
}

export interface BggGameToBePlayed {
  game: BggGame;
  plays: BggGameToBePlayedItem[];
}

export interface BggGameToBePlayedItem {
  plays: number;
  userName: string;
}
