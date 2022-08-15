import { AppProps } from "next/app";
import { MantineProvider,ColorSchemeProvider,ColorScheme, SpotlightProvider,SpotlightAction,NotificationsProvider} from 'ui';
import myTheme from 'ui/theme';
import axios from "axios";
import { SWRConfig } from "swr";
import {useState} from "react"

axios.defaults.baseURL = 'http://localhost:3002';

export default function App(props:AppProps){
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return(
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={
            {
              colorScheme:colorScheme,
              ...myTheme
            }
          }>
          <NotificationsProvider>
            <SWRConfig
            value={{
              refreshInterval: 3000,
              fetcher: (url, config) => axios.get(url, config).then(res => res.data),
            }}
            >
            <Component {...pageProps} />
            </SWRConfig>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
  );
}