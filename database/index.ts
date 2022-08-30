import { FileDatabase } from './infra/file';
import { InMemoryDatabase } from './infra/in-memory';
import { BggLestPlayPersistence } from './interface';

let fileInstance: BggLestPlayPersistence;
let inMemoryInstance: BggLestPlayPersistence;

function getDatabase(): BggLestPlayPersistence {
  switch (process.env.DATABASE_TYPE) {
    case 'file':
      if (!process.env.DATABASE_PATH) {
        throw new Error(
          `BGG-LP: DATABASE: Path not defined ${process.env.DATABASE_PATH}`,
        );
      }
      if (!fileInstance) {
        fileInstance = new FileDatabase(process.env.DATABASE_PATH);
      }
      return fileInstance;

    case 'in-memory':
      if (!inMemoryInstance) {
        inMemoryInstance = new InMemoryDatabase();
      }
      return inMemoryInstance;

    default: {
      const message = `BGG-LP: DATABASE: Unknown type ${process.env.DATABASE_TYPE}`;
      throw new Error(message);
    }
  }
}

export { getDatabase };
