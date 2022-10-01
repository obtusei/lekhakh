import { AppProps } from 'next/app';
import { MantineProvider,ColorSchemeProvider,ColorScheme, SpotlightProvider,SpotlightAction,NotificationsProvider,useLocalStorage} from 'ui';
import myTheme from "ui/theme"
import { SWRConfig } from 'swr';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3002';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'lekhakh-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
   const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <>
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
                  fetcher:(url, config) => axios.get(url, config).then(res => res.data),
                }}
              >
                <Component {...pageProps}/>
              </SWRConfig>
            </NotificationsProvider>
          </MantineProvider>
          </ColorSchemeProvider>
    </>
  );
}