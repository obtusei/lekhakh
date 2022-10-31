import { AppProps } from "next/app";
import { MantineProvider,ColorSchemeProvider,ColorScheme, SpotlightProvider,SpotlightAction,NotificationsProvider,useLocalStorage} from 'ui';
import myTheme from 'ui/theme';
import axios from "axios";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
axios.defaults.baseURL = 'http://localhost:3002';



export default function App(props:AppProps){
  const { Component, pageProps } = props;
  const router = useRouter()
  const onTrigger = (href:any) => { router.push(href)};

  const actions: SpotlightAction[] = [
    { title: 'Discover', group: 'main', onTrigger: () => router.push('/discover') },
    { title: 'Trending', group: 'main', onTrigger: () => router.push('/trending')  },
    { title: 'Following', group: 'main', onTrigger: () => router.push('/following')  },
    { title: 'Writers', group: 'main', onTrigger: () => router.push('/writers')  },
    { title: 'Settings', group: 'main', onTrigger: () => router.push('/settings')  },
  ];
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
  catData?.map(({name}:{name:string})=>(actions.push({title:name,group: 'Category',onTrigger:() => router.push(`/category/${name.toLowerCase()}`)}))) || [];

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