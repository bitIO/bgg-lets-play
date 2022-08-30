import { BggGame, BggPlay, BggUser, NotPlayedGames } from '../../types/bgg';

interface Summary {
  [id: number]: {
    game: BggGame;
    plays: BggPlay[];
  };
}

function getNotPlayedGamesTogether(users: BggUser[]): NotPlayedGames[] {
  const userNames = users.map((user) => {
    return user.userName;
  });
  const summary: Summary = {};
  users.forEach((user) => {
    user.collection?.games.forEach((game) => {
      if (!summary[game.id]) {
        summary[game.id] = {
          game,
          plays: [],
        };
      }
      const userPlays = user.plays?.filter((play) => {
        return play.game.id === game.id;
      });
      summary[game.id].plays = summary[game.id].plays.concat(userPlays || []);
    });
  });

  const notPlayedGames: NotPlayedGames[] = [];

  Object.keys(summary).forEach((key) => {
    const entry = summary[parseInt(key, 10)];
    const playedTogether = entry.plays.find((play) => {
      const playPlayers = play.players
        .map((player) => {
          return player.username || '';
        })
        .filter((playerUsername) => {
          return playerUsername !== '';
        });
      return userNames.every((userName) => {
        return playPlayers.includes(userName);
      });
    });
    if (!playedTogether) {
      console.log(entry.game.name, 'has not been played by both');
      const notPlayedGamesItem: NotPlayedGames = {
        game: entry.game,
        playsByUser: [],
      };
      users.forEach((user) => {
        const userPlays = user.plays?.filter((play) => {
          return play.game.id === entry.game.id;
        });
        notPlayedGamesItem.playsByUser.push({
          plays: userPlays || [],
          userName: user.userName,
        });
      });
      notPlayedGames.push(notPlayedGamesItem);
    }
  });

  return notPlayedGames.sort((a, b) => {
    if (a.game.name > b.game.name) {
      return 1;
    }
    if (a.game.name < b.game.name) {
      return -1;
    }
    return 0;
  });
}

export { getNotPlayedGamesTogether };
