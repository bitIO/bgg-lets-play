import { getGamesInfo, getUser, getUserPlays, getUserShelve } from './bgg-api';

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

  it('should retrieve one game info', async () => {
    const [data] = await getGamesInfo([173346]);
    expect(data).toBeDefined();
    expect(data.market).toBeDefined();
    expect(data.market?.owned).toBeDefined();
    expect(data.market?.trading).toBeDefined();
    expect(data.market?.wanting).toBeDefined();
    expect(data.market?.whishing).toBeDefined();
    expect(data.stats).toBeDefined();
    expect(data.stats?.comments).toBeDefined();
    expect(data.stats?.rating).toBeDefined();
    expect(data.stats?.weight).toBeDefined();
    expect(data.publishedYear).toEqual(2015);
  });
  it('should retrieve two games info', async () => {
    const [game1, game2] = await getGamesInfo([173346, 156443]);
    expect(game1).toBeDefined();
    expect(game1.market).toBeDefined();
    expect(game1.market?.owned).toBeDefined();
    expect(game1.market?.trading).toBeDefined();
    expect(game1.market?.wanting).toBeDefined();
    expect(game1.market?.whishing).toBeDefined();
    expect(game1.stats).toBeDefined();
    expect(game1.stats?.comments).toBeDefined();
    expect(game1.stats?.rating).toBeDefined();
    expect(game1.stats?.weight).toBeDefined();
    expect(game1.publishedYear).toEqual(2015);

    expect(game2).toBeDefined();
    expect(game2.market).toBeDefined();
    expect(game2.market?.owned).toBeDefined();
    expect(game2.market?.trading).toBeDefined();
    expect(game2.market?.wanting).toBeDefined();
    expect(game2.market?.whishing).toBeDefined();
    expect(game2.stats).toBeDefined();
    expect(game2.stats?.comments).toBeDefined();
    expect(game2.stats?.rating).toBeDefined();
    expect(game2.stats?.weight).toBeDefined();
    expect(game2.publishedYear).toEqual(2021);
  });
});
