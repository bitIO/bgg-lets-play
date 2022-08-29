import { getUser, getUserPlays, getUserShelve } from './bgg.api';

describe('BGG API', () => {
  jest.setTimeout(30000);

  const userName = process.env.TEST_BGG_USER || 'bitio';

  it('should retrieve a user', async () => {
    const data = await getUser(userName);
    expect(data).toBeDefined();
    expect(data.userName).toEqual(userName);
    expect(data.firstName).toEqual('Francisco');
    expect(data.lastName).toEqual('Calle');
    expect(data.id).toEqual(2136121);
  });

  it('should retrieve user plays', async () => {
    const data = await getUserPlays(userName);
    expect(data).toBeDefined();
    expect(data.total).toBeGreaterThan(200);
    expect(data.plays.length).toEqual(data.total);
  });

  it('should retrieve user owned shelve without expansions', async () => {
    const data = await getUserShelve(userName, true, true);
    expect(data).toBeDefined();
    expect(data.games.length).toEqual(data.totalItems);
  });
});
