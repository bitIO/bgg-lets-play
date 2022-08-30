import { BggUser } from '../types/bgg';

interface BggLestPlayPersistence {
  loadAllUsers: () => BggUser[];
  loadUser: (userName: string) => BggUser;
  saveUser: (user: BggUser) => void;
}

export type { BggLestPlayPersistence };
