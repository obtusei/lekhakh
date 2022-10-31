import { Avatar, Badge, Button, Card, Group, Text, Title,Stack,Paper,HoverCard, Anchor, Modal, ActionIcon, ChevronIcon, Alert} from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'
import { IBlog } from '../../lib/interfaces'
import Href from '../Link'
import { BookmarkButton, CommentButton, LikeButton, ShareButton } from '../StateButtons'
import { getInitial } from '../../lib/logics'
import {useRouter} from "next/router"
import {convert} from "html-to-text"
function BlogCard({props,session,isSmall,index,likeclick,bookmarkclick,doesLike,doesSave}:{props:IBlog,session:any,isSmall?:boolean,index?:number,likeclick:() => void,bookmarkclick:() => void,doesLike:boolean,doesSave:boolean}) {
  const [isOpen,setIsOpen] = useState(false);
  const time = (date:string) => new Date(date).toDateString()
  const router = useRouter()
  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        title="Please login"
      >
        <Button onClick={() => router.push("/login")}>Login</Button>
      </Modal>

    <Link href={`/blog/${props.id}`} key={props.id}>
      <Stack style={{flexDirection:"row",padding:"0px",minWidth:"400px"}}>
      {
        isSmall && (
          <Title style={{opacity:0.4}}>{index}</Title>
        )
      }
      <Card shadow="sm" p="md" radius="md" withBorder style={{width:"100%"}}>
          <Group position='apart'>
                <Group>
                      <Avatar size="sm" src={props?.user.image != null ? `http://localhost:3002${props.user.image}`:""} radius={20}>{getInitial(props.user.name)}</Avatar>
                    <Text>{props?.user.name}</Text>
                </Group>
                <ShareButton href={`http://localhost:3002/blog/${props.id}`}/>
          </Group>
          <Title order={3}>{props.title}</Title>
          {
            !isSmall && (
              <>
              <Text lineClamp={4} color="dimmed">{convert(props.content,{wordwrap:130})}</Text>
              <Group mt={"sm"}>
                        {
                          props?.tag != null && props.tag.map((tag,index) => (
                            <div key={index}>
                              <Href link={`/tag/${tag.name.toLowerCase()}`} title={`#${tag.name}`}/>
                            </div>
                          ))
                        }
              </Group>
              </>
            )
          }
          <Group mt={"sm"}>
            <Text color={"dimmed"}>{time(props.updatedAt)}</Text>
            <Badge>{props.category.name}</Badge>
          </Group>
          <Group position="apart" mt={"md"}>
                    <Group>
                      <LikeButton onClick={() => {
                        if (session?.user){
                          likeclick()
                        }else{
                          setIsOpen(true)
                        }
                      }} doesLike={doesLike}
                      />
                      <CommentButton onClick={() => router.push(`/blog/${props.id}?comment=true`)}/>
                      {/* <ShareButton/> */}
                    </Group>
                      <BookmarkButton onClick={() => {
                        if (session?.user){
                          bookmarkclick()
                        }else{
                          setIsOpen(true)
                        }
                      }} doesSave={doesSave}/>      
          </Group>
    </Card>
    </Stack>
    </Link>
    </div>
  )
}

export default BlogCard
