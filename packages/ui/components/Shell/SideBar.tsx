import {
  Navbar,
  NavLink,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DiscoverIcon } from '../../Icons';
import { SideBarProps } from '../../lib/interfaces';
import { NAVDATA } from '../../lib/navdata';
import { useMantineColorScheme } from '@mantine/core';

export default function SideBar(props: {data: SideBarProps[]}){
  const router = useRouter()
  const theme = useMantineTheme()
  const {data} = props
  const {colorScheme} = useMantineColorScheme()
  const activeColor = colorScheme === 'dark' ? theme.colors.lekhakh[0]:theme.colors.secondary[0];
  const mainColor = colorScheme === 'dark' ? theme.colors.primary[7]:theme.colors.primary[0];
  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden width={{ sm: 0, lg: 300 }} style={{border:"none"}}>
      {
              data.map((navItem,index) => (
                <Link href={`${navItem.href}`} passHref key={index}>
                   <NavLink label={navItem.label} icon={DiscoverIcon} defaultOpened style={{color:router.pathname === navItem.href ? activeColor:mainColor,fontWeight:"600"}}>
                    {
                      navItem.links?.map((link,i) => (
                        <Link href={`${link.link}`} passHref key={i}>
                          <NavLink component="a" label={link.label} />
                        </Link>
                      ))
                    }
                   </NavLink>
                   </Link>
              ))
      }
    </Navbar>
  )
}
