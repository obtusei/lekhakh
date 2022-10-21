import { useRouter } from 'next/router'
import React from 'react'
import { Title,Text,Tabs, Grid, Card } from 'ui'
import BlogCard from 'ui/components/Cards/BlogCard'
import ProfileCard, { UserProfileCardStringProps } from 'ui/components/Profile/ProfileCard'
import { IUser } from 'ui/lib/interfaces'
import { SearchBlogs } from '../api/blog'
import { GetSession, SearchUsers } from '../api/user'
import { ErrorSection, LoadingSection } from '../components/ErrorAndLoading'
import Layout from '../components/Layout'

type Props = {}

function Search() {
  const router = useRouter()
  const blogs = SearchBlogs(String(router.query.q))
  const users = SearchUsers(String(router.query.q))
  const {session } = GetSession()
  const stringData:UserProfileCardStringProps = {
    blogs: "Blogs",
    followers: "Followers",
    following: "Following",
    follow: "Follow",
    contact: "Contact"
  }
  return (
    <Layout>
      <Title>Search</Title>
      <Text>Search term for {`"${router.query.q}"`}</Text>
      <br />
      <Tabs defaultValue="blogs">
      <Tabs.List>
        <Tabs.Tab value="blogs">Blogs</Tabs.Tab>
        <Tabs.Tab value="users">Users</Tabs.Tab>
      </Tabs.List>
      <br />
      <Tabs.Panel value="blogs">
        <Grid grow>
          {
            blogs.data ? blogs.data.map((blog,index) => (
              <Grid.Col span={4} key={index}>
                <BlogCard props={blog} session={session}/>
              </Grid.Col>
            )): blogs.isError ? <ErrorSection/>:<LoadingSection/>

          }
        </Grid>
      </Tabs.Panel>

      <Tabs.Panel value="users">
        <Grid grow>
          {
            users.data ? users.data.map((user:IUser,index:number) => (
              <Grid.Col span={4} key={index}>
                <Card shadow={"lg"} withBorder>
                  <ProfileCard props={user} session={session} stringData={stringData}  />
                </Card>
              </Grid.Col>
            )):
            users.isError ? <ErrorSection/>:<LoadingSection/>
          }
        </Grid>
      </Tabs.Panel>
    </Tabs>
    </Layout>
  )
}

export default Search