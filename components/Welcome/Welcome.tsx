import { Text, Title } from '@mantine/core';

import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <Title align="center" className={classes.title} mt={100}>
      Welcome to{' '}
      <Text component="span" inherit variant="gradient">
        BGG Let&acute;s Play
      </Text>
    </Title>
  );
}
