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
  publishedYear?: number;
  stats?: BggGameStats;
}

export interface BggGameImage {
  image: string;
  thumbnail: string;
}

export interface BggGameMarket {
  owned: number;
  trading: number;
  wanting: number;
  whishing: number;
}

export interface BggGameStats {
  comments: number;
  rating: number;
  weight: number;
}

export interface BggGameToBePlayed {
  game: BggGame;
  plays: BggGameToBePlayedItem[];
}

export interface BggGameToBePlayedItem {
  plays: number;
  userName: string;
}

export interface BggPlay {
  date: Date;
  game: BggGame;
  id: number;
  length: number;
  location: string;
  players: BggPlayPlayer[];
  quantity: number;
}

export interface BggPlayPlayer {
  color?: string;
  name?: string;
  new?: boolean;
  rating?: string;
  score?: string;
  startposition?: string;
  userid?: number;
  username?: string;
  win?: boolean;
}

export interface BggPlays {
  plays: BggPlay[];
  total: number;
}

export interface BggUser {
  avatar?: string;
  collection?: BggCollection;
  firstName: string;
  id: number;
  lastName: string;
  plays?: BggPlays;
  userName: string;
}
