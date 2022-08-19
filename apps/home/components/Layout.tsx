import React, { useEffect } from 'react'
import { Shell, useMantineColorScheme } from 'ui'
import { NavData, SideBarProps } from 'ui/lib/interfaces'
import useTranslation from 'next-translate/useTranslation';
import { CategoryIcon, DiscoverIcon, FollowingIcon, HashtagIcon, TrendingIcon, WriterIcon } from 'ui/Icons';
import useSWR from 'swr';
import axios from 'axios';
import { GetSession } from '../api/user';
import { getHotkeyHandler } from '@mantine/hooks';
import { useRouter } from 'next/router';
import TopAlert from 'ui/components/TopAlert';

function Layout({children,isNavHidden}:{children:React.ReactNode,isNavHidden?:boolean}) {
  const { t } = useTranslation();
  const {data:catData,error} = useSWR('/admin/categories',{ refreshInterval: 0 });
  const {data:tagData,error:tagError} = useSWR('/admin/tags',{ refreshInterval: 0 });
  const categories:{ label: string; link: string }[] = catData?.map(({name}:{name:string})=>({label:name,link:`/category/${name.toLowerCase()}`})) || [];
  const hashtags:{ label: string; link: string }[] = tagData?.map(({name}:{name:string})=>({label:name,link:`/tag/${name.toLowerCase()}`})) || [];
  const {session,isLoading} = GetSession();
  const {colorScheme,toggleColorScheme} = useMantineColorScheme()
  
  const navData:NavData = {
    login:t('common:login'),
    register:t('common:beOne'),
    logout:t('common:logout'),
    account:t('common:account'),
    saved:t('common:saved'),
    search:t('common:search'),
    reportBugs:t('common:reportBugs'),
    settings:t('common:settings'),
    feedback:t('common:feedback'),
  }
  const sideBarData:SideBarProps[] = [
    { label: t('common:discover'), icon: DiscoverIcon,href:"/discover"},
    { label: t('common:trending'), icon: TrendingIcon,href:"/trending" },
    { label: t('common:following'), icon: FollowingIcon,href:"/following" },
    { label: t('common:writers'), icon: WriterIcon,href:"/writers" },
    {
      label: t('common:category'),
      icon: CategoryIcon,
      intiallyOpen: true,
      links: categories ,
    },
    {
      label: t('common:hashtag'),
      icon: HashtagIcon,
      intiallyOpen: true,
      links: hashtags,
    }
  ]
  const router = useRouter();
  useEffect(() => {
    document.body.addEventListener(
      'keydown',
      getHotkeyHandler([
        ['mod+D', () => router.push('/discover')],
        ['mod+T', () => router.push('/trending')],
        ['mod+F', () => router.push('/following')],
        ['mod+W', () => router.push('/writers')],
        ['mod+J', () => toggleColorScheme()],
      ])
    );
  })
  return (
   <div>
      
     <Shell isNavHidden={isNavHidden} sideBardata={sideBarData}  navData={navData} session={session?.user} isLoading={isLoading}>
      {children}
    </Shell>
   </div>
  )
}

export default Layout