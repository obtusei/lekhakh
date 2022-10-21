import Link from 'next/link'
import { Title,Text, Divider, Group, Avatar, Stack, Input, Button, Badge, ActionIcon, Center } from '@mantine/core'
import blogData from '../lib/blogData'
import { IAPI, IBlog } from '../lib/interfaces'
import { IconArrowLeft, IconBookmark, IconHeart, IconShare } from '@tabler/icons'
import { BookmarkButton, LikeButton, PauseButton, PlayButton, ShareButton } from './StateButtons'
import { ShareIcon } from '../Icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useScrollIntoView } from '@mantine/hooks'
import { getInitial } from '../lib/logics'
import RichTextEditor from '@mantine/rte'

function BlogPost({props,comments,onPlayClick, goToComment,doComment,delComment}:{props?:IBlog,comments:IAPI,onPlayClick:()=>void,goToComment?:boolean,doComment:(comment:string) => void,delComment:(comment:string) => void}) {
  const router = useRouter();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });
  const [isPlaying,setIsPlaying] = useState(true)
  const [comment,setComment] = useState("")
  const time = (date:string) => new Date(date).toDateString()
  useEffect(() => {
    if (goToComment){
      scrollIntoView({alignment:"start"})
    }
  })
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
        {/* <RichTextEditor value = {props?.content || ""} readOnly onChange={(e) => console.log(e)}s/> */}
      </div><br />
      <Group style={{padding:"10px"}}>
        <Text><span style={{fontWeight:"bold"}}>12</span> Likes</Text>
        <Text><span style={{fontWeight:"bold"}}>12</span> Comment</Text>
      </Group><br />
        <Divider/>
      <div><br />
        <Title order={3}>Comments</Title>
        <div style={{backgroundColor:"rgba(0,0,0,0.05)",padding:"10px",borderRadius:"10px"}}>
          <Stack style={{padding:"5px"}}>
            {
              comments.data ? (comments.data.length !=0 ? comments.data.map((cmt,index) => (
                <Stack spacing={2} key={index}>
                  <Group style={{justifyContent:"space-between"}}>
                    <Group spacing={5}>
                      <Avatar src={cmt.User.image} size="sm" radius={30}>{getInitial(cmt.User.name)}</Avatar>
                    <Text size={'md'} color="blue" weight={"bold"} onClick={
                      () => {
                        router.push(`/${cmt.User.username}`)
                      }
                    } style={{cursor:"pointer"}}>{cmt.User.name}</Text>
                    <Text size={"sm"} color={"dimmed"}>{time(cmt.createdAt)}</Text>
                    </Group>
                    <ActionIcon size={"sm"} onClick={
                      () => {
                        delComment(cmt.id)
                      }
                    }>
                      <IconHeart/>
                    </ActionIcon>
                  </Group>
                  <Text>{cmt.text}</Text>
                </Stack>
              )): <Center style={{width:"100%"}}>
                <Text color={"dimmed"}>No comments to show</Text>
              </Center>) :
              comments.isLoading ? <></>:<></>
            }
            
          </Stack>
        </div>
        <br />
        <div style={{backgroundColor:"rgba(0,0,0,0.05)",padding:"10px",borderRadius:"10px"}} ref={targetRef}>
          <Group style={{width:"100%"}}>
            <Input placeholder="Write a comment" variant='filled' autoFocus={goToComment} value={comment} onChange={(e)=> setComment(e.target.value)}/>
            <Button onClick={
              () => {
                doComment(comment)
              }
            }>Post</Button>
          </Group>
        </div>


      </div>


    </div>
  )
}

export default BlogPost