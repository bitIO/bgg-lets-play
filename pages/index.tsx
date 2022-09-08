import { Center, SimpleGrid } from '@mantine/core';

import { UsersSelector } from '../components/UsersSelector/UsersSelector';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <Center
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <SimpleGrid cols={1}>
        <Welcome />
        <UsersSelector />
      </SimpleGrid>
    </Center>
  );
}
