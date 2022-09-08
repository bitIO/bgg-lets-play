import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';

import useStyles from './Error500.styles';

interface Error500Props {
  error: Error;
}

function Error500({ error }: Error500Props) {
  const { classes } = useStyles();
  const { reload } = useRouter();
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text align="center" className={classes.error} color="yellow" size="md">
          {error.message}
        </Text>
        {error.stack && (
          <Text
            align="center"
            className={classes.error}
            color="yellow"
            size="md"
          >
            {error.stack}
          </Text>
        )}
        <Text align="center" className={classes.description} size="lg">
          Our servers could not handle your request. Don&apos;t worry, our
          development team was already notified. Try refreshing the page.
        </Text>
        <Group position="center">
          <Button
            onClick={() => {
              return reload();
            }}
            size="md"
            variant="white"
          >
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}

export default Error500;
