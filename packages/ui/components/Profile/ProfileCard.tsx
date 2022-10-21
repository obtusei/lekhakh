import { ActionIcon, Avatar, Button, ChevronIcon, Group, Modal, NavLink, Skeleton, Stack,Text,Title, UnstyledButton } from '@mantine/core'
import React, { useState } from 'react'
import { TickIcon } from '../../Icons'
import { IUser } from '../../lib/interfaces'
import { getInitial } from '../../lib/logics'
import {useRouter} from "next/router"

export interface UserProfileCardStringProps {
  blogs: string
  followers: string
  following: string
  follow: string
}

function ProfileCard({props,session,followers,followings,doesFollow,onFollowClick,stringData,hideBio}:{props:IUser,session:any,followers?:any,followings?:any,doesFollow?:any,onFollowClick:() => void,stringData:UserProfileCardStringProps,hideBio?:boolean}) {
  const [openFollower,setOpenFollower] = useState(false)
  const [openFollowing,setOpenFollowing] = useState(false)
  const router = useRouter()
  return (
    <div>
      <Modal
        opened={openFollower}
        onClose={() => setOpenFollower(false)}
        title={stringData.followers}
      >
          {
          followers ? followers?.map((follower:any,index:number) => (
            <div key={index}>
              <NavLink 
                label={follower.follower.name} 
                description={`@${follower.follower.username}`}
                onClick={() => {
                  setOpenFollower(false)
                  router.push(`/${follower.follower.username}`)
                }} 
                icon={<Avatar src={follower.follower.image} radius={"lg"}>{getInitial(follower.follower.name)}</Avatar>}
              />
            </div>
            )):<></>
          }
      </Modal>
      <Modal
        opened={openFollowing}
        onClose={() => setOpenFollowing(false)}
        title={stringData.following}
      >
          {
          followings ? followings?.map((follow:any,index:number) => (
            <div key={index}>
              <NavLink 
                label={follow.following.name}
                description={`@${follow.following.username}`} 
                onClick={() => {
                  setOpenFollowing(false)
                  router.push(`/${follow.following.username}`)
                }} 
                icon={<Avatar src={follow.following.image} radius={"lg"}>{getInitial(follow.following.name)}</Avatar>}
              />
            </div>
            )):<></>
          }
      </Modal>
      <Stack style={{flexDirection:"row",alignItems:"center"}} spacing={20}>
        <Avatar size="xl" src={ props.image != null ? ("http://localhost:3002" + props?.image):""} alt="User" radius={40} draggable={false}>{getInitial(props?.name)}</Avatar>
        <Stack align={"left"}>
          <Stack spacing={0}>
              <Title order={3}>{props?.name}</Title>
            <Group spacing={5}>
              <Text>@{props?.username}</Text>
              {
                props?.isVerifiedUser ? <TickIcon/>:<></>
              }
            </Group>
            {
              hideBio ? "":<Text>{props?.bio}</Text>
            }
            <Group>
              <Text><span style={{fontWeight:"bold"}}>{props?._count?.blogs}</span> {stringData.blogs}</Text>
              <UnstyledButton onClick={ () => {
                setOpenFollower(true)
              }} disabled={ props.username != session?.user?.username }>
                <Text><span style={{fontWeight:"bold"}}>{props?._count?.followers}</span> {stringData.followers}</Text>
              </UnstyledButton>
              <UnstyledButton onClick={ () => {
                setOpenFollowing(true)
              }} disabled={ props.username != session?.user?.username }>
                <Text><span style={{fontWeight:"bold"}}>{props?._count?.following}</span> {stringData.following}</Text>  
              </UnstyledButton>            
            </Group>
          </Stack>
          <Group>
            {
              session?.user != null ? props.username != session?.user.username ? (
              !doesFollow?.doesFollow ? <Button variant='outline' onClick={() => onFollowClick()}>{stringData.follow}</Button>:
              <Button variant="subtle" onClick={() => onFollowClick()}>{stringData.following}</Button>
              ):<></>
              :<Button variant='outline' onClick={() => onFollowClick()}>{stringData.follow}</Button>
            }
          </Group>
        </Stack>
      </Stack> <br />
                  
    </div>
  )
}

export default ProfileCard