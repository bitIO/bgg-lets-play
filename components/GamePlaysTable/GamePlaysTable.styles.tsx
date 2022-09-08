import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => {
  return {
    header: {
      '&::after': {
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.gray[2]
        }`,
        bottom: 0,
        content: '""',
        left: 0,
        position: 'absolute',
        right: 0,
      },
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      position: 'sticky',
      top: 0,

      transition: 'box-shadow 150ms ease',
    },

    scrolled: {
      boxShadow: theme.shadows.sm,
    },
  };
});

export default useStyles;
