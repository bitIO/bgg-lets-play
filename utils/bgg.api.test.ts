import { getUser } from './bgg.api';

describe('BGG API', () => {
  it('should retrieve a user', async () => {
    const data = await getUser('bitio');
    expect(data).toBeDefined();
    expect(data.userName).toEqual('bitio');
    expect(data.firstName).toEqual('Francisco');
    expect(data.lastName).toEqual('Calle');
    expect(data.id).toEqual(2136121);
  });
});
