import { Avatar, Badge, Button, Card, Group, Text, Title,Stack,Paper,HoverCard, Anchor, Modal} from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'
import { IBlog } from '../../lib/interfaces'
import Href from '../Link'
import { BookmarkButton, CommentButton, LikeButton, ShareButton } from '../StateButtons'

function BlogCard({props,session,isSmall,index}:{props:IBlog,session:any,isSmall?:boolean,index?:number}) {
  const [isOpen,setIsOpen] = useState(false);
  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        title="Introduce yourself!"
      >
        Lovely to meet you!
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
                  {/* Hover Card */}
                  <HoverCard>
                  <HoverCard.Target>
                    <Group>
                      <Avatar size="sm" src={props?.user.image} radius={20}/>
                    <Text>{props?.user.name}</Text>
                    </Group> 
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Paper>
                      <Group>
                      <Avatar size="sm" src={props?.user.image} radius={20}/>
                      <Stack spacing={0}>
                        <Title order={4}>{props?.user.name}</Title>
                        <Group style={{opacity:0.5}}>
                          <Text><span style={{fontWeight:'bold'}}>{props?.user.blogs}</span> Blogs</Text>
                        <Text><span style={{fontWeight:'bold'}}>{props?.user.followers}</span> Followers</Text>
                        <Text><span style={{fontWeight:'bold'}}>{props?.user.following}</span> Following</Text>
                        </Group>
                      </Stack>
                      </Group>
                      <Button size='sm'>Follow</Button>
                    </Paper>
                  </HoverCard.Dropdown>
                  </HoverCard>
                {/* END */}
                </Group>
                <ShareButton/>
          </Group>
          <Title order={3}>{props.title}</Title>
          {
            !isSmall && (
              <>
              <Text lineClamp={4}>{props.content}</Text>
              <Group mt={"sm"}>
                        {/* {
                          props.tag.map((tag,index) => (
                            <div key={index}>
                              <Href link={`/tag/${tag.name.toLowerCase()}`} title={tag.name}/>
                            </div>
                          ))
                        } */}
              </Group>
              </>
            )
          }
          <Group mt={"sm"}>
            <Text>{props.updatedAt}</Text>
            <Badge>{props.category.name}</Badge>
          </Group>
          <Group position="apart" mt={"md"}>
                    <Group>
                      <LikeButton onClick={
                        () => {
                          !session ? setIsOpen(true):null
                        }
                      }/>
                      <CommentButton/>
                      {/* <ShareButton/> */}
                    </Group>
                      <BookmarkButton/>      
          </Group>
    </Card>
    </Stack>
    </Link>
    </div>
  )
}

export default BlogCard
