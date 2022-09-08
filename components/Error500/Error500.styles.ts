import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  return {
    description: {
      color: theme.colors[theme.primaryColor][1],
      margin: 'auto',
      marginBottom: theme.spacing.xl,
      marginTop: theme.spacing.xl,
      maxWidth: 540,
    },

    error: {
      backgroundColor: theme.white,
      borderRadius: 3,
      color: theme.colors.red,
      fontFamily: 'monospace',
      marginBottom: theme.spacing.xl,
      marginTop: theme.spacing.xl,
      padding: theme.spacing.xs,
    },

    label: {
      color: theme.colors[theme.primaryColor][3],
      fontSize: 220,
      fontWeight: 900,
      lineHeight: 1,
      marginBottom: theme.spacing.xl * 1.5,
      textAlign: 'center',

      [theme.fn.smallerThan('sm')]: {
        fontSize: 120,
      },
    },

    root: {
      backgroundColor: theme.fn.variant({
        color: theme.primaryColor,
        variant: 'filled',
      }).background,
      height: '100vh',
      paddingBottom: 120,
      paddingTop: 80,
      width: '100vw',
    },

    title: {
      color: theme.white,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 38,
      fontWeight: 900,
      textAlign: 'center',

      [theme.fn.smallerThan('sm')]: {
        fontSize: 32,
      },
    },
  };
});

export default useStyles;
