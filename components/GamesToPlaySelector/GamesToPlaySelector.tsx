import { useState } from 'react';

import {
  TransferList,
  TransferListData,
  TransferListItem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { GameItem } from './GameItem';
import useStyles from './GamesToPlaySelector.styles';

import { Game, ShouldPlay } from '../../types';

interface GamesToPlaySelectorProps {
  gamesToPlay: ShouldPlay[];
}

function getGameRating(game: Game) {
  return game.stats.rating.average || 0;
}

function buildInitialData(gamesToPlay: ShouldPlay[]) {
  return gamesToPlay
    ? gamesToPlay
        .sort((a, b) => {
          if (getGameRating(a.game) < getGameRating(b.game)) {
            return 1;
          }
          if (getGameRating(a.game) > getGameRating(b.game)) {
            return -1;
          }
          return 0;
        })
        .map((entry): TransferListItem => {
          return {
            image: entry.game.images.thumbnail,
            label: entry.game.name,
            rating: entry.game.stats.rating.average?.toFixed(2),
            value: `${entry.game.id}`,
          };
        })
    : [];
}

function GamesToPlaySelector({ gamesToPlay }: GamesToPlaySelectorProps) {
  const initialData = buildInitialData(gamesToPlay);
  const [data, setData] = useState<TransferListData>([initialData, []]);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const { classes } = useStyles();
  return (
    <TransferList
      breakpoint="sm"
      className={classes.container}
      filter={(query, item) => {
        return (
          item.label.toLowerCase().includes(query.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(query.toLowerCase().trim())
        );
      }}
      itemComponent={GameItem}
      listHeight={isMobile ? 70 : 300}
      nothingFound="Nothing here"
      onChange={setData}
      searchPlaceholder="Search game..."
      titles={['Games to play', 'Games selected to play']}
      value={data}
    />
  );
}

export { GamesToPlaySelector };
