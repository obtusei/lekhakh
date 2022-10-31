import { useRouter } from 'next/router'
import { Title,Text,Tabs, Grid, Paper, Group, Avatar, Stack, Button } from 'ui'
import ProfileCard, { UserProfileCardStringProps } from 'ui/components/Profile/ProfileCard'
import { IUser } from 'ui/lib/interfaces'
import { getInitial } from 'ui/lib/logics'
import { SearchBlogs } from '../api/blog'
import { GetSession, SearchUsers } from '../api/user'
import Card from '../components/Card'
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
                <Card blog={blog}/>
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
                {/* <Card shadow={"lg"} withBorder> */}
                  {/* <ProfileCard props={user} session={session} stringData={stringData} onFollowClick={() => alert("FOLLOW")}  /> */}
                  <Paper withBorder key={index} style={{padding:"20px"}}>
                    <Group style={{justifyContent:"space-between"}}>
                      <Group>
                        <Avatar size={"sm"} src={user.image != null ? `http://localhost:3002${user.image}`:""} radius={100}>{getInitial(user.name)}</Avatar>
                        <Stack spacing={0}>
                          <Title order={5}>{user.name}</Title>
                          <Text color="dimmed">@{user.username}</Text>
                        </Stack>
                      </Group>
                      <Button variant='light' onClick={() => router.push(`/${user.username}`)}>See More</Button>
                    </Group>
                  </Paper>
                {/* </Card> */}
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