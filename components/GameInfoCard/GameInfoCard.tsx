import { Avatar, Button, Card, Group, Text, Title } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';
import Link from 'next/link';

import useStyles from './GameInfoCard.styles';

import { GameStats } from '../../types';
import { useGamesToPlay } from '../GamesToPlayContext/GamesToPlayContext';

function buildStatsBlock({ comments, rating, weight }: GameStats) {
  const { average } = rating;

  return (
    <>
      <div>
        <Text align="center" size="lg" weight={500}>
          {(average || 0).toFixed(2)}
        </Text>
        <Text align="center" color="dimmed" size="sm">
          Rating
        </Text>
      </div>

      <div>
        <Text align="center" size="lg" weight={500}>
          {(weight || 0).toFixed(2)}
        </Text>
        <Text align="center" color="dimmed" size="sm">
          Weight
        </Text>
      </div>

      <div>
        <Text align="center" size="lg" weight={500}>
          {comments}
        </Text>
        <Text align="center" color="dimmed" size="sm">
          Comments
        </Text>
      </div>
    </>
  );
}

function GameInfoCard() {
  const { classes } = useStyles();
  const { gamesToPlayState } = useGamesToPlay();

  if (!gamesToPlayState.selectedGameId) {
    return null;
  }
  if (!gamesToPlayState.selectedGameInfo) {
    return <div>Cannot find game info</div>;
  }

  const { id, info, images, name, stats } = gamesToPlayState.selectedGameInfo;

  return (
    <>
      <Title order={3}>Game Info</Title>
      <Card className={classes.card} p="xl" radius="md" withBorder>
        <Card.Section
          sx={{
            backgroundImage: `url("${images.image}")`,
            backgroundSize: 'cover',
            height: 140,
          }}
        />
        <Avatar
          className={classes.avatar}
          mt={-30}
          mx="auto"
          radius={80}
          size={80}
          src={images.thumbnail}
        />
        <Text align="center" mt="sm" size="lg" weight={500}>
          {name}
        </Text>
        <Text align="center" color="dimmed" size="sm">
          Players: {info.minPlayers} / {info.maxPlayers} - Playtime:{' '}
          {info.playingTime}
        </Text>
        <Group mt="md" position="center" spacing={30}>
          {buildStatsBlock(stats)}
        </Group>
        <Link
          href={`https://boardgamegeek.com/boardgame/${id}`}
          target="_blank"
        >
          <Button
            className={classes.button}
            fullWidth
            mt="xl"
            radius="md"
            rightIcon={<IconExternalLink />}
            size="md"
          >
            View in BGG
          </Button>
        </Link>
      </Card>
    </>
  );
}

export default GameInfoCard;
