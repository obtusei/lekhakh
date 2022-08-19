import Link from 'next/link'
import { Title,Text, Divider, Group, Avatar, Stack, Input, Button, Badge, ActionIcon } from '@mantine/core'
import blogData from '../lib/blogData'
import { IBlog } from '../lib/interfaces'
import { IconArrowLeft, IconBookmark, IconHeart, IconShare } from '@tabler/icons'
import { BookmarkButton, LikeButton, PauseButton, PlayButton, ShareButton } from './StateButtons'
import { ShareIcon } from '../Icons'
import { useRouter } from 'next/router'
import { useState } from 'react'

function BlogPost({props,onPlayClick}:{props?:IBlog,onPlayClick:()=>void}) {
  const router = useRouter();
  const [isPlaying,setIsPlaying] = useState(true)
  return (
    <div>
      {/* <Text color={"red"} weight={"bold"} size="sm">Love story</Text> */}
      <Group style={{justifyContent:"space-between"}}>
        <Group>
        <Button leftIcon={<IconArrowLeft/>} variant="white" onClick={() => router.back()}>Go Back</Button>
        </Group>
        <Group>
          <LikeButton onClick={
            () => {

            }
          }/>
          <BookmarkButton/>
          <ShareButton/>
        </Group>
      </Group>
      <br />
      
      <Badge>{props?.category.name}</Badge>
      <Title>{props?.title}</Title>
      <br />
      <Group align={"center"}>
        <Avatar src={props?.user.image} size="md" radius={30}/>
        <Stack spacing={0}>
          <Text>By <Link href={"/lvo"}>{props?.user.name || ""}</Link></Text>
          <Text size={'sm'} color="dimmed">Updated: {props?.updatedAt}</Text>
        </Stack>
      </Group>
      <br />

      <div>
        <Text>{props?.content}</Text>
      </div><br />
      <Group style={{padding:"10px"}}>
        <Text><span style={{fontWeight:"bold"}}>12</span> Likes</Text>
        <Text><span style={{fontWeight:"bold"}}>12</span> Comment</Text>
      </Group><br />
        <Divider/>
      <div><br />
        <Title order={3}>Comments</Title>
        <div style={{backgroundColor:"rgba(0,0,0,0.05)",padding:"10px",borderRadius:"10px"}}>
          <Stack spacing={2}>
        <Group spacing={4}>
          {/* <Avatar src={"https://i.pravatar.cc/300"} size="sm" radius={30}/> */}
          <Text size={'md'} color="blue" weight={"bold"}>Abhishek Bhatta</Text>
          <Text size={"sm"} color={"dimmed"}>• 12:30 am  May 12, 2022</Text>
        </Group>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, voluptas dignissimos quam fugit </Text>
        </Stack>
        </div>
        <br />
        <div style={{backgroundColor:"rgba(0,0,0,0.05)",padding:"10px",borderRadius:"10px"}}>
          <Group style={{width:"100%"}}>
            <Input placeholder="Write a comment"/>
            <Button>Post</Button>
          </Group>
        </div>


      </div>


    </div>
  )
}

export default BlogPost