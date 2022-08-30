import {
  Avatar,
  Badge,
  Checkbox,
  Group,
  Text,
  TransferListItemComponentProps,
} from '@mantine/core';

function GameItem(props: TransferListItemComponentProps) {
  const { data, selected } = props;
  return (
    <Group noWrap>
      <Avatar radius="xl" size="lg" src={data.images.thumbnail} />
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
            Rating: {data.stats.rating.toFixed(2)}
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
