import {
  Avatar,
  Badge,
  Checkbox,
  Group,
  Text,
  TransferListItemComponentProps,
} from '@mantine/core';

import { useGamesToPlay } from '../GamesToPlayContext/GamesToPlayContext';

function GameItem(props: TransferListItemComponentProps) {
  const { data, selected } = props;
  const { gamesToPlayDispatch } = useGamesToPlay();

  return (
    <Group
      noWrap
      onMouseEnter={() => {
        gamesToPlayDispatch({
          payload: {
            id: data.value,
          },
          type: 'setSelectedGameId',
        });
      }}
      onTouchMove={() => {
        gamesToPlayDispatch({
          payload: {
            id: data.value,
          },
          type: 'setSelectedGameId',
        });
      }}
      onTouchStart={() => {
        gamesToPlayDispatch({
          payload: {
            id: data.value,
          },
          type: 'setSelectedGameId',
        });
      }}
    >
      <Avatar radius="xl" size="lg" src={data.image} />
      <div
        style={{
          flex: 1,
        }}
      >
        <Text size="sm" weight={500}>
          {data.label}
        </Text>
        <Text color="dimmed" size="xs" weight={400}>
          <Badge color="dark" size="xs" variant="outline">
            Rating: {data.rating}
          </Badge>
        </Text>
      </div>
      <Checkbox
        checked={selected}
        onChange={() => {}}
        sx={{
          pointerEvents: 'none',
        }}
        tabIndex={-1}
      />
    </Group>
  );
}

export { GameItem };
