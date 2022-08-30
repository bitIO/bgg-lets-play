import { useState } from 'react';

import {
  TransferList,
  TransferListData,
  TransferListItem,
} from '@mantine/core';

import { GameItem } from './GameItem';

import { NotPlayedGames } from '../../types/bgg';

interface GamesToPlaySelectorProps {
  gamesToPlay: NotPlayedGames[];
}

function GamesToPlaySelector(props: GamesToPlaySelectorProps) {
  const { gamesToPlay } = props;
  const initialData = gamesToPlay
    ? gamesToPlay.map((entry): TransferListItem => {
        return {
          images: entry.game.images,
          label: entry.game.name,
          market: entry.game.market,
          stats: entry.game.stats,
          value: `${entry.game.id}`,
        };
      })
    : [];
  const [data, setData] = useState<TransferListData>([initialData, []]);

  return (
    <TransferList
      breakpoint="sm"
      filter={(query, item) => {
        return (
          item.label.toLowerCase().includes(query.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(query.toLowerCase().trim())
        );
      }}
      itemComponent={GameItem}
      listHeight={300}
      nothingFound="Nothing here"
      onChange={setData}
      searchPlaceholder="Search game..."
      titles={['Games to play', 'Games selected to play']}
      value={data}
    />
  );
}

export { GamesToPlaySelector };
