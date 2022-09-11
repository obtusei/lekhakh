import React from 'react'
import { Header,Stack,ActionIcon,Button,useMantineColorScheme, Menu, Text, UnstyledButton, Avatar, Group, Input, Code, MediaQuery, Select} from '@mantine/core'
import { SunIcon,MoonIcon, TickIcon } from '../../Icons'
import { IconArrowBarRight, IconBookmark, IconBug, IconChevronDown, IconMessage, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import { LogoLink } from '../StateButtons';
import { NavData } from '../../lib/interfaces';
import { ColorModeAndLocale } from '../LowerMenu';
import TopAlert from '../TopAlert';

export default function Navbar({navData,session,isLoading}: {navData:NavData,session?:any,isLoading?:boolean}) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  
  function getInitial(name:string){
    let initial:string;
    if (name){
      if (name.includes(' ')){
        const fullName = name.split(' ');
        initial = fullName[0].charAt(0).toUpperCase() + fullName[1].charAt(0).toUpperCase();
      }else{
        initial = name.charAt(0).toUpperCase();
      }
      return initial;
    }
    return null
  }

  return (
    <Header height={70} p="md" style={{border:"none"}}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%',justifyContent:"space-between"}}>
              <LogoLink/>
              {
                isLoading ? (
                  <></>
                ):
                (
                  <Stack style={{flexDirection:"row",alignItems:"center"}}>
                  {/* <MediaQuery smallerThan={"md"} styles={{display:"none"}}> */}
                    <ColorModeAndLocale/>
                    <Input placeholder='Search' rightSection={<Code>/</Code>} variant="filled"/>
                  {/* </MediaQuery> */}
                {
                  session ? (
                    <Menu>
                  <Menu.Target>
                    <UnstyledButton>
                      <Group>
                        <Avatar src={session.image || ""} alt={session.name} radius="xl" size={20} color={"red"}>{getInitial(session.name)}</Avatar>
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                          {session?.name}
                        </Text>
                        <IconChevronDown size={12} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconUser size={14} />}>{navData.account}</Menu.Item>
                    <Menu.Item icon={<IconSettings size={14} />}>{navData.settings}</Menu.Item>
                    <Menu.Item icon={<IconBookmark size={14} />}>{navData.saved}</Menu.Item>
                    <Menu.Item
                      icon={<IconSearch size={14} />}
                      rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                    >
                      {navData.search}
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Item icon={<IconBug size={14} />}>{navData.reportBugs}</Menu.Item>
                    <Menu.Item icon={<IconMessage size={14} />}>{navData.feedback}</Menu.Item>
                    <Menu.Item icon={<IconArrowBarRight size={14} />}>{navData.logout}</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                  ):
                  (
                    <Group>
                    <Button variant='light'>{navData.login}</Button>
                    <Button variant='filled'>{navData.register}</Button>
                  </Group>
                  )
                }
              </Stack>
                )
              }
          </div>
        </Header>
  )
}