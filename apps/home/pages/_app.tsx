import { AppProps } from "next/app";
import { MantineProvider,ColorSchemeProvider,ColorScheme, SpotlightProvider,SpotlightAction,NotificationsProvider,useLocalStorage} from 'ui';
import myTheme from 'ui/theme';
import axios from "axios";
import useSWR, { SWRConfig } from "swr";
import {useEffect, useState} from "react"
import { GetCategories } from "../api/user";

axios.defaults.baseURL = 'http://localhost:3002';
const onTrigger = () => {};

const actions: SpotlightAction[] = [
  { title: 'Home', group: 'main', onTrigger },
  { title: 'Docs', group: 'main', onTrigger },
  { title: 'Dashboard', group: 'main', onTrigger },
];

export default function App(props:AppProps){
  const { Component, pageProps } = props;

  // const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'lekhakh-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
   const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // const toggleColorScheme = (value?: ColorScheme) =>
  //   setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const {data:catData,error} = useSWR('/admin/categories',{ refreshInterval: 0 });
  catData?.map(({name}:{name:string})=>(actions.push({title:name,group: 'Cat',onTrigger}))) || [];

  return(
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={
            {
              colorScheme:colorScheme,
              ...myTheme
            }
          }>
          <NotificationsProvider>
            <SpotlightProvider shortcut={['mod + P', 'mod + K', '/']} actions={actions}>
            <SWRConfig
            value={{
              refreshInterval: 3000,
              fetcher: (url, config) => axios.get(url, config).then(res => res.data),
            }}
            >
            <Component {...pageProps} />
            </SWRConfig>
            </SpotlightProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
  );
}