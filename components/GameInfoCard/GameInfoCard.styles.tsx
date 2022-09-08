import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  return {
    avatar: {
      border: `2px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
      }`,
    },

    button: {
      '&:hover': {
        backgroundColor: theme.fn.darken('#3f3a60', 0.05),
      },
      backgroundColor: theme.fn.lighten('#3f3a60', 0.05),
    },

    card: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
  };
});

export default useStyles;
