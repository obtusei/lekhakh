import { ActionIcon, Avatar, Button, ChevronIcon, Group, Stack,Text,Title } from '@mantine/core'
import { IconChecks, IconCircleCheck } from '@tabler/icons'
import React from 'react'
import { TickIcon } from '../../Icons'
import { IUser } from '../../lib/interfaces'

export interface UserProfileCardStringProps {
  blogs: string
  followers: string
  following: string
  follow: string
  contact: string
}

function ProfileCard({props,stringData,hideBio}:{props:any,stringData:UserProfileCardStringProps,hideBio?:boolean}) {
  return (
    <div>
      <Stack style={{flexDirection:"row",alignItems:"center"}} spacing={20}>
        <Avatar size="xl" src={""} alt="User" radius={40} />
        <Group align={"center"}>
          <Stack spacing={0}>
            <Title order={3}>{props?.name}</Title>
            <Group spacing={5}>
                      <Text>@{props?.username}</Text>
                      <TickIcon/>
            </Group>
            {
              hideBio ? "":<Text>{props?.bio}</Text>
            }
            <Group>
              <Text><span style={{fontWeight:"bold"}}>{props?.blogs}</span> {stringData.blogs}</Text>
              <Text><span style={{fontWeight:"bold"}}>{props?.followers}</span> {stringData.followers}</Text>
              <Text><span style={{fontWeight:"bold"}}>{props?.following}</span> {stringData.following}</Text>
            </Group>
                    
          </Stack>

          <Group>
                    <Button variant='outline'>{stringData.follow}</Button>
                    <Button variant='subtle'>{stringData.contact}</Button>
          </Group>
        </Group>
                
      </Stack> <br />
                  
    </div>
  )
}

export default ProfileCard