import { BggUser } from '../../types/bgg';
import { BggLestPlayPersistence } from '../interface';

interface UsersDatabase {
  [key: string]: BggUser;
}

class InMemoryDatabase implements BggLestPlayPersistence {
  private db: UsersDatabase;

  constructor() {
    this.db = {};
  }

  loadAllUsers() {
    return Object.values(this.db);
  }

  loadUser(userName: string) {
    return this.db[userName];
  }

  saveUser(user: BggUser) {
    this.db[user.userName] = user;
  }
}

export { InMemoryDatabase };
