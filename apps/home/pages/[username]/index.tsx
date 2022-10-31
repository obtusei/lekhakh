import { useRouter } from 'next/router'
import { Button, Divider, Grid, Tabs} from 'ui'
import ProfileCard, { UserProfileCardStringProps } from 'ui/components/Profile/ProfileCard'
import { IBlog, IUser } from 'ui/lib/interfaces'
import { GetUserBlogs } from '../../api/blog'
import { DoesFollow, followSomeone, GetSession,GetUserbyUsername, GetUserFollowers, GetUserFollowing, GetUserSaved } from '../../api/user'
import Layout from '../../components/Layout'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Card from '../../components/Card'
import useTranslation from 'next-translate/useTranslation'
import EmptyContent from '../../components/EmptyContent'
import {useState} from "react"
import { LoginModal } from '../../components/LoginModal'
import { ErrorSection, LoadingSection } from '../../components/ErrorAndLoading'

export async function getStaticPaths() {
  const response = await axios.get(`/user`)
  const users = response.data
  const paths = users.map((user:IUser) => ({
    params: {
      username:user.username.toString().toLowerCase()
    }
  }))
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params?.username
  const user = await axios.get("/user/" + username)
  const userData = await user.data;
  return {
    props: { 
      user:userData
    },
  }
}

function UserProfile({user}:{user:IUser}) {
  const router = useRouter()
  const {blogData,isError,isLoading} = GetUserBlogs(String(router.query.username))
  const {userData} = GetUserbyUsername(String(router.query.username))
  const {session}= GetSession()
  const userSaved:any = GetUserSaved()
  const {followers} = GetUserFollowers()
  const {following} = GetUserFollowing()
  const doesFollow = DoesFollow(user ? user.id:"")
  const {t} = useTranslation("other")
  const [openLogin,setOpenLogin] = useState(false)
  const stringData:UserProfileCardStringProps = {
    blogs: t("blogs"),
    followers: t("followers"),
    following: t("following"),
    follow: t("follow"), 
  }

  return (
    <Layout>
      <LoginModal myVar={openLogin} setMyVar={setOpenLogin}/>
 {/* PROFILE CARD */}
          <ProfileCard 
            props={userData ? userData:user}
            stringData={stringData}
            session={session} 
            followers={followers ? followers.followers:null}
            followings={following ? following.following:null}
            doesFollow={doesFollow.data}  
            onFollowClick={() => session && session.user ? followSomeone(userData,doesFollow):setOpenLogin(true)}
          />
          <br />
          <Divider/>
          <br />

{/* TABS FOR BLOGS */}
          <Tabs defaultValue={session && session.user && router.query.saved === "true" ? "saved":"blogs"}>
            <Tabs.List>
              <Tabs.Tab value="blogs">{t("blogs")}</Tabs.Tab>
              {
                session &&  router.query.username == session.user?.username && <Tabs.Tab value="saved">{t("saved")}</Tabs.Tab>
              }
            </Tabs.List>
          <br />

          <Tabs.Panel value="blogs">
            <Grid grow>
              {
                blogData ? (blogData.blogs?.length != 0 ? blogData.blogs?.map((blog:IBlog,index:number) => (
                  <Grid.Col span={4} key={index}>
                    <Card blog={blog}/>
                  </Grid.Col>
                ))
                :
                <EmptyContent/>)
                :
                isLoading ? <LoadingSection/>:<ErrorSection/>
              }
            </Grid>
            
          </Tabs.Panel>
{/* TABS FOR SAVED BLOGS IF SESSION */}
          {
            session && session.user && <Tabs.Panel value='saved'>
              <Grid>
              {
                userSaved.data ? (userSaved.data.length != 0 ? userSaved?.data?.map((blog:{blog:IBlog},index:number) => (
                  <Grid.Col span={4} key={index}>
                    <Card blog={blog.blog}/>
                  </Grid.Col>
                ))
                :
                <EmptyContent/>)
                :
                userSaved.isLoading ? <LoadingSection/>:<ErrorSection/>
              }
            </Grid>
            </Tabs.Panel>
          }
          </Tabs>
    </Layout>
  )
}

export default UserProfile