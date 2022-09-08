import { useState } from 'react';

import { Center, Container, Grid, Notification } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Error500 from '../components/Error500/Error500';
import GameInfoCard from '../components/GameInfoCard/GameInfoCard';
import GamePlaysTable from '../components/GamePlaysTable/GamePlaysTable';
import { GamesToPlayProvider } from '../components/GamesToPlayContext/GamesToPlayContext';
import { GamesToPlaySelector } from '../components/GamesToPlaySelector/GamesToPlaySelector';
import { ShouldPlay, ShouldPlaySchema } from '../types';
import { fetcherSimple } from '../utils';

function validateResponse(data: ShouldPlay[]) {
  try {
    data.forEach((entry) => {
      const entryParseResult = ShouldPlaySchema.safeParse([entry]);
      if (!entryParseResult.success) {
        console.error('Error parsing game:', entry.game.name);
        console.log(entryParseResult.error.issues);
      }
    });
  } catch (error) {
    console.log('data :>> ', data);
    throw new Error('Error validating response from API');
  }
}

export default function ShouldPlayPage() {
  const [isSlow, setIsSlow] = useState<boolean>(false);
  const router = useRouter();
  const users = Array.isArray(router.query.users)
    ? router.query.users
    : (router.query.users || 'nope,nope').split(',');
  const { data, error, isValidating } = useSWR<ShouldPlay[]>(
    `/api/anxiety/${users[0]}/vs/${users[1]}`,
    fetcherSimple,
    {
      loadingTimeout: 45 * 1000,
      onLoadingSlow(key, config) {
        console.log('Slow connection', {
          config,
          key,
        });
        setIsSlow(true);
      },
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );

  if (isValidating) {
    return (
      <Center
        style={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <Notification
          disallowClose
          loading
          title="Downloading data from the server"
        >
          Please wait until data is download.
        </Notification>
      </Center>
    );
  }

  if (error) {
    console.log(error);
    return <Error500 error={error} />;
  }

  if (data) {
    validateResponse(data);
    return (
      <GamesToPlayProvider
        initialState={{
          shouldPlayItems: data,
        }}
      >
        <Container fluid>
          <Grid grow>
            <Grid.Col span={12}>
              <GamesToPlaySelector gamesToPlay={data} />
            </Grid.Col>
            <Grid.Col span={4}>
              <GameInfoCard />
            </Grid.Col>
            <Grid.Col span={8}>
              <GamePlaysTable users={users} />
            </Grid.Col>
          </Grid>
        </Container>
      </GamesToPlayProvider>
    );
  }
}
