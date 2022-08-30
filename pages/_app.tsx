import { useState } from 'react';

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps, colorScheme } = props;
  const [selectedColorScheme, setColorScheme] =
    useState<ColorScheme>(colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (selectedColorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
        <link href="/favicon.svg" rel="shortcut icon" />
      </Head>

      <ColorSchemeProvider
        colorScheme={selectedColorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme: selectedColorScheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  return {
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
  };
};

export default App;
