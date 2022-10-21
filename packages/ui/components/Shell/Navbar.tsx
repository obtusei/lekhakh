import React, { useState } from 'react'
import { Header,Stack,ActionIcon,Button,useMantineColorScheme, Menu, Text, UnstyledButton, Avatar, Group, Input, Code, MediaQuery, Select} from '@mantine/core'
import { IconArrowBarRight, IconBookmark, IconBug, IconChevronDown, IconMessage, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import { LogoLink } from '../StateButtons';
import { NavData } from '../../lib/interfaces';
import { ColorModeAndLocale } from '../LowerMenu';
import { getInitial } from '../../lib/logics';
import {useRouter} from "next/router"

export default function Navbar({navData,session,isLoading}: {navData:NavData,session?:any,isLoading?:boolean}) {
  const router = useRouter();
  const [search,setSearch] = useState("")
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
                    <Input placeholder='Search' rightSection={<Code>/</Code>} value={search} variant="filled" onKeyDown={(e) => {
                      if (e.key == "Enter"){
                        router.push(`/search?q=${search}`)
                      }
                    }} onChange={(e) => setSearch(e.target.value)}/>
                  {/* </MediaQuery> */}
                {
                  session ? (
                  <>
                  <Button onClick={() => router.push("/blog/create")}>Create</Button>
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
                    <Menu.Item icon={<IconUser size={14} />} onClick={() => router.push(`/${session.username}`)}>{navData.account}</Menu.Item>
                    <Menu.Item icon={<IconSettings size={14} />} onClick={() => router.push("/settings")}>{navData.settings}</Menu.Item>
                    <Menu.Item icon={<IconBookmark size={14} />} onClick={() => router.push("/saved")}>{navData.saved}</Menu.Item>
                    <Menu.Item
                      icon={<IconSearch size={14} />}
                      rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                    >
                      {navData.search}
                    </Menu.Item>

                    <Menu.Divider />
                    <Menu.Item icon={<IconBug size={14} />} onClick={() => router.push("/report")}>{navData.reportBugs}</Menu.Item>
                    <Menu.Item icon={<IconMessage size={14} />} onClick={() => router.push("/feedback")}>{navData.feedback}</Menu.Item>
                    <Menu.Item icon={<IconArrowBarRight size={14} />} onClick={() => router.push("/logout")}>{navData.logout}</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                </>
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