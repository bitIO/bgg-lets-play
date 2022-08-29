import { getUser, getUserPlays } from './bgg.api';

describe('BGG API', () => {
  it('should retrieve a user', async () => {
    const data = await getUser('bitio');
    expect(data).toBeDefined();
    expect(data.userName).toEqual('bitio');
    expect(data.firstName).toEqual('Francisco');
    expect(data.lastName).toEqual('Calle');
    expect(data.id).toEqual(2136121);
  });

  it('should retrieve user plays', async () => {
    const data = await getUserPlays('bitio');
    expect(data).toBeDefined();
    expect(data.total).toBeGreaterThan(200);
    expect(data.plays.length).toEqual(data.total);
  });
});
