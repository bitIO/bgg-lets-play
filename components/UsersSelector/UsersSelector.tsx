import { useState } from 'react';

import { Button, Container, Group, SimpleGrid, TextInput } from '@mantine/core';
import { IconDice, IconShoppingCart } from '@tabler/icons';
import Link from 'next/link';

export function UsersSelector() {
  const [userName, setUserName] = useState<string[]>([]);
  return (
    <Container>
      <SimpleGrid
        breakpoints={[
          {
            cols: 1,
            maxWidth: 'sm',
          },
        ]}
        cols={2}
      >
        <TextInput
          label="User A"
          onChange={(event) => {
            setUserName([
              event.currentTarget.value.toLocaleLowerCase(),
              userName[1],
            ]);
          }}
          placeholder="bgg user name"
          value={userName[0]}
        />
        <TextInput
          label="User B"
          onChange={(event) => {
            setUserName([
              userName[0],
              event.currentTarget.value.toLocaleLowerCase(),
            ]);
          }}
          placeholder="bgg user name"
          value={userName[1]}
        />
      </SimpleGrid>
      <Group mt="md" position="center">
        <Button
          disabled
          gradient={{
            from: 'orange',
            to: 'red',
          }}
          leftIcon={<IconShoppingCart />}
          type="submit"
          variant="gradient"
        >
          What should I buy?
        </Button>
        <Link href={`/should-play?users=${userName.join(',')}`}>
          <Button
            disabled={userName.length !== 2}
            gradient={{
              from: 'indigo',
              to: 'cyan',
            }}
            leftIcon={<IconDice />}
            type="submit"
            variant="gradient"
          >
            What should we play?
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
