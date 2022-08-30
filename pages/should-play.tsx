import { Container } from '@mantine/core';
import { GetServerSideProps } from 'next';

import { GamesToPlaySelector } from '../components/GamesToPlaySelector/GamesToPlaySelector';
import { NotPlayedGames } from '../types/bgg';

interface ShouldPlayPageProps {
  notPlayedGames: NotPlayedGames[];
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let notPlayedGames: NotPlayedGames[] = [];
  if (query.users) {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/collection/diff?users=${query.users}&sortBy=rating`,
      );
      notPlayedGames = (await response.json()) as NotPlayedGames[];
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {
      notPlayedGames,
    },
  };
};

export default function ShouldPlayPage(props: ShouldPlayPageProps) {
  const { notPlayedGames } = props;
  return (
    <Container>
      <GamesToPlaySelector gamesToPlay={notPlayedGames} />
    </Container>
  );
}
