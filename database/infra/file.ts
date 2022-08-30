import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { BggUser } from '../../types/bgg';
import { BggLestPlayPersistence } from '../interface';

class FileDatabase implements BggLestPlayPersistence {
  constructor(private rootFolder: string) {}

  loadAllUsers() {
    const users: BggUser[] = [];
    const entries = readdirSync(this.rootFolder);
    entries.forEach((entry) => {
      try {
        const userData = JSON.parse(join(this.rootFolder, entry)) as BggUser;
        users.push(userData);
      } catch (error) {
        console.error(`Error loading file: ${entry}`);
        console.error((error as Error).message);
      }
    });
    return users;
  }

  loadUser(userName: string) {
    try {
      const userData = JSON.parse(
        join(this.rootFolder, `${userName}.json`),
      ) as BggUser;
      return userData;
    } catch (error) {
      console.error(`Error loading file: ${userName}.json`);
      console.error((error as Error).message);
      throw error;
    }
  }

  saveUser(user: BggUser) {
    try {
      writeFileSync(
        join(this.rootFolder, `${user.userName}.json`),
        JSON.stringify(user, null, 2),
      );
    } catch (error) {
      console.error(`Error loading file: ${user.userName}.json`);
      console.error((error as Error).message);
      throw error;
    }
  }
}

export { FileDatabase };
