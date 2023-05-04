import React, { useState } from 'react'
import { Header,Stack,ActionIcon,Button,useMantineColorScheme, Menu, Text, UnstyledButton, Avatar, Group, Input, Code, MediaQuery, Select, Title} from '@mantine/core'
import { IconArrowBarRight, IconBookmark, IconBug, IconChevronDown, IconMessage, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import { LogoLink } from '../StateButtons';
import { NavData } from '../../lib/interfaces';
import { ColorModeAndLocale } from '../LowerMenu';
import { getInitial } from '../../lib/logics';
import {useRouter} from "next/router"
import Link from "next/link"
export default function Navbar({navData,session,isLoading,isAdmin}: {navData:NavData,session?:any,isLoading?:boolean,isAdmin?:boolean}) {
  const router = useRouter();
  const [search,setSearch] = useState("")
  return (
    <Header height={70} p="md" style={{border:"none"}}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%',justifyContent:"space-between"}}>
              
              {
                isAdmin ? <Text>Lekhakh | Admin</Text>:<Link href={"/"}><Group><LogoLink/><Title order={4}>Lekhakh</Title></Group></Link>
              }
              {
                isLoading ? (
                  <></>
                ):
                (
                  <Stack style={{flexDirection:"row",alignItems:"center"}}>
                  {/* <MediaQuery smallerThan={"md"} styles={{display:"none"}}> */}
                    {
                      !isAdmin ? <>
                      <ColorModeAndLocale/>
                    <Input placeholder='Search' rightSection={<Code>/</Code>} value={search} variant="filled" onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key == "Enter"){
                        router.push(`/search?q=${search}`)
                      }
                    }}  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch("e.target.value")}/>
                    </>:<></>
                    }
                  {/* </MediaQuery> */}
                {
                  session ? (
                  <>
                  {
                    isAdmin ? <></>:<Button onClick={() => router.push("/blog/create")}>Create</Button>
                  }
                  <Menu>
                  <Menu.Target>
                    <UnstyledButton>
                      <Group>
                        <Avatar src={session.image != null ? `http://localhost:3002${session.image}`:""} alt={session.name} radius="xl" size={20} color={"red"}>{getInitial(session.name)}</Avatar>
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                          {session?.name}
                        </Text>
                        <IconChevronDown size={12} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {
                      !isAdmin ?
                      <>
                    <Menu.Item icon={<IconUser size={14} />} onClick={() => router.push(`/${session.username}`)}>{navData.account}</Menu.Item>
                    <Menu.Item icon={<IconSettings size={14} />} onClick={() => router.push("/settings")}>{navData.settings}</Menu.Item>
                    <Menu.Item icon={<IconBookmark size={14} />} onClick={() => router.push(`/${session.username}?saved=true`)}>{navData.saved}</Menu.Item>

                    <Menu.Divider />
                    <Menu.Item icon={<IconBug size={14} />} onClick={() => router.push("/report")}>{navData.reportBugs}</Menu.Item>
                    <Menu.Item icon={<IconMessage size={14} />} onClick={() => router.push("/feedback")}>{navData.feedback}</Menu.Item>
                    <Menu.Item icon={<IconArrowBarRight size={14} />} onClick={() => router.push("/logout")}>{navData.logout}</Menu.Item>
                    
                    </>:
                    
                    <Menu.Item icon={<IconArrowBarRight size={14} />} onClick={() => router.push("/logout")}>{navData.logout}</Menu.Item>
                    }
                  </Menu.Dropdown>
                </Menu>
                </>
                  ):
                  (
                    <Group>
                    <Button variant='light' onClick={() => router.push("/login")}>{navData.login}</Button>
                    <Button variant='filled' onClick={() => router.push("/register")}>{navData.register}</Button>
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