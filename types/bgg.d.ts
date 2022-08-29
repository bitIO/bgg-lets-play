export interface BggShelve {
  games: BggGame[];
  publicationDate: Date;
  totalItems: number;
}

export interface BggGame {
  id: number;
  images: BggGameImage;
  name: string;
  plays: number;
  publishedYear: number;
  rating: number;
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
