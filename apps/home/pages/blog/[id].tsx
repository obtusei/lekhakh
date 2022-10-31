import Link from 'next/link'
import React, {useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import { Title,Text, Divider, Group, Avatar, Stack, Input, Button, Badge, ActionIcon, Center,IconArrowLeft,RichTextEditor,LikeButton,ShareButton,BookmarkButton, IconHeart, convert, IconTrash} from 'ui'
import { useRouter } from 'next/router'
import { GetBlogComments, GetSpecificBlog } from '../../api/blog'
import { useScrollIntoView } from 'ui'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { IBlog, IComment } from 'ui/lib/interfaces'
import { delComment, doComment } from '../../api/posts'
import { getInitial } from 'ui/lib/logics'
import useTranslation from 'next-translate/useTranslation'
import { ErrorSection, LoadingSection } from '../../components/ErrorAndLoading'
import { GetSession } from '../../api/user'
import { LoginModal } from '../../components/LoginModal'

export async function getStaticPaths() {
  const response = await axios.get(`/blog`)
  const blogs = response.data
  const paths = blogs.map((blog:IBlog) => ({
    params: {
      id:blog.id
    }
  }))
  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const res = await axios.get("/blog/" + id)
  const blogData = await res.data;
  return {
    props: { 
      blog:blogData
    },
  }
}

function Blog({}) {
  const router = useRouter()
  const {t} = useTranslation()
  const id:string = String(router.query.id);
  const {blogData} = GetSpecificBlog(id) 
  const comments = GetBlogComments(id)
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 });
  const time = (date:string) => new Date(date).toDateString()
  const [isPlaying,setIsPlaying] = useState(false)
  const [comment,setComment] = useState("")
  const {session} = GetSession()
  const [loginModal,openLoginModal] = useState(false)

  useEffect(() => {
    if (router.query.comment == "true"){
      scrollIntoView({alignment:"start"})
    }
  })
  const speak = (text:string) => {
      const convertString = convert(text)
      const synRef = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(convertString)
      synRef.speak(utterance)
      setIsPlaying(true)
  }
  return (
    <Layout>
      <LoginModal myVar={loginModal} setMyVar={() => openLoginModal(false)}/>
        <Group style={{justifyContent:"space-between"}}>
          <Group>
          <Button leftIcon={<IconArrowLeft/>} variant="white" onClick={() => router.back()}>{t("common:goBack")}</Button>
          </Group>
          <Group>
            {/* <LikeButton onClick={
              () => {

              }
            }/>
            <BookmarkButton/>
            <ShareButton/> */}
          </Group>
        </Group>
        <br />
        
        <Badge>{blogData?.category.name}</Badge>
        <Title>{blogData?.title}</Title>
        <br />
        <Group align={"center"}>
          <Avatar src={blogData?.user.image} size="md" radius={30}>{getInitial(blogData?.user.name || "")}</Avatar>
          <Stack spacing={0}>
            <Text size={'md'} color="blue" weight={"bold"} onClick={
                        () => {
                          router.push(`/${blogData?.user.username}`)
                        }
                      } style={{cursor:"pointer"}}>{blogData?.user.name}</Text>
            <Text size={'sm'} color="dimmed">Updated At: {time(blogData?.updatedAt || "")}</Text>
          </Stack>
        </Group>
        <br />

        <div>
          <RichTextEditor value = {blogData?.content || ""} readOnly onChange={(e) => console.log(e)} style={{border:"none"}}/>
        </div><br />

        <Group style={{padding:"10px"}}>
          <Text><span style={{fontWeight:"bold"}}>{blogData?.likes.length}</span>{t("other:likes")}</Text>
          <Text><span style={{fontWeight:"bold"}}>{blogData?.comments.length}</span> Comment</Text>
        </Group><br />
        <Divider/>
        <div><br />
{/* COMMENTS */}
          <Title order={3}>Comments</Title>
          <div style={{backgroundColor:"rgba(0,0,0,0.05)",padding:"10px",borderRadius:"10px"}}>
            <Stack style={{padding:"5px"}}>
              {
                comments.data ? (comments.data.length !=0 ? comments.data.map((cmt:IComment,index:number) => (
                  <div key={index}>
                    <Stack spacing={2}>
                    <Group style={{justifyContent:"space-between"}}>
                      <Group spacing={5}>
                        <Avatar src={cmt?.User?.image} size="sm" radius={30}>{getInitial(cmt?.User?.name || "")}</Avatar>
                      <Text size={'md'} color="blue" weight={"bold"} onClick={
                        () => {
                          router.push(`/${cmt?.User?.username}`)
                        }
                      } style={{cursor:"pointer"}}>{cmt?.User?.name}</Text>
                      <Text size={"sm"} color={"dimmed"}>{time(cmt.createdAt)}</Text>
                      </Group>
                      <ActionIcon size={"sm"} onClick={
                        () => {
                          delComment(cmt.id,blogData?.id || "")
                        }
                      }>
                        <IconTrash/>
                      </ActionIcon>
                    </Group>
                    <Text>{cmt.text}</Text>
                  </Stack>
                  </div>
                  
                )): <Center style={{width:"100%"}}>
                  <Text color={"dimmed"}>{t("other:noCommentToShow")}</Text>
                </Center>) :
                comments.isLoading ? <LoadingSection/>:<ErrorSection/>
              }
              
            </Stack>
          </div>
          <br />
          <div style={{backgroundColor:"rgba(0,0,0,0.05)",padding:"10px",borderRadius:"10px"}} ref={targetRef}>
            <Group style={{width:"100%"}}>
              <Input placeholder={t("other:writeAComment")} variant='filled' value={comment} onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setComment(e.target.value)}/>
              <Button onClick={
                () => {
                  session && session.user ? doComment(comment,blogData?.id || "")
                  : openLoginModal(true)
                }
              }>{t("other:comment")}</Button>
            </Group>
          </div>


        </div>
    </Layout>
  )
}

export default Blog