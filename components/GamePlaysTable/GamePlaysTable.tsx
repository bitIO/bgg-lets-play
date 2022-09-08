import { useState } from 'react';

import {
  Center,
  Highlight,
  ScrollArea,
  SimpleGrid,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons';
import { formatDistance } from 'date-fns';

import useStyles from './GamePlaysTable.styles';

import { useGamesToPlay } from '../GamesToPlayContext/GamesToPlayContext';

interface GamePlaysTableProps {
  users: string[];
}

function formatDateString(dateString: string) {
  const date = new Date(dateString);
  return (
    <SimpleGrid cols={1}>
      <Text align="center" size="sm">
        {formatDistance(date, new Date())}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
      </Text>
    </SimpleGrid>
  );
}

function GamePlaysTable({ users }: GamePlaysTableProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const { gamesToPlayState } = useGamesToPlay();
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (!gamesToPlayState.selectedGameId) {
    return null;
  }
  if (!gamesToPlayState.selectedGamePlays) {
    return <div>Cannot find game plays</div>;
  }

  const rows = gamesToPlayState.selectedGamePlays.map((play) => {
    return (
      <tr key={play.id}>
        <td>{formatDateString(play.date)}</td>
        <td>{play.location}</td>
        <td>
          {play.players
            .map((player) => {
              return player.name;
            })
            .join(', ')}
        </td>
        <td data-mobile>
          <Highlight highlight={users}>
            {play.players
              .filter((player) => {
                return player.username !== '';
              })
              .map((player) => {
                return player.username;
              })
              .join(', ')}
          </Highlight>
        </td>
      </tr>
    );
  });

  return (
    <>
      {isMobile && (
        <Center inline>
          <IconInfoCircle />
          <Text color="dimmed" size="sm">
            &nbsp;BGG user not shown in mobile
          </Text>
        </Center>
      )}
      <Title order={3}>Game Plays</Title>
      <ScrollArea
        onScrollPositionChange={({ y }) => {
          return setScrolled(y !== 0);
        }}
        sx={{
          height: 300,
        }}
      >
        <Table className={classes.table} highlightOnHover>
          <thead
            className={cx(classes.header, {
              [classes.scrolled]: scrolled,
            })}
          >
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Players</th>
              <th data-mobile>Bgg users</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}

export default GamePlaysTable;
