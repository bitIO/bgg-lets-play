import { Button, Container, Group, SimpleGrid, TextInput } from '@mantine/core';

export function UsersSelector() {
  return (
    <Container>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <TextInput label="User A" placeholder="bgg user name" />
        <TextInput label="User B" placeholder="bgg user name" />
      </SimpleGrid>
      <Group position="right" mt="md">
        <Button type="submit" className={classes.control}>
          Send message
        </Button>
      </Group>
    </Container>
  );
}
