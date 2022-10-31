import useTranslation from 'next-translate/useTranslation'
import { Grid,Title, Divider,Text } from 'ui'
import BlogCard from 'ui/components/Cards/BlogCard'
import { GetUserFollowingBlogs } from '../api/blog'
import { GetSession } from '../api/user'
import Card from '../components/Card'
import EmptyContent from '../components/EmptyContent'
import { ErrorSection, LoadingSection } from '../components/ErrorAndLoading'
import Layout from '../components/Layout'

function Following() {
  const followers = 0
  const {followingData,isError} = GetUserFollowingBlogs();
  const {t} = useTranslation()
  return (
    <Layout>
          <Title>{t("common:following")}</Title>
          <Text color="dimmed">{t("common:fromFollowers",{ follower: followers})}</Text>
          <br />
          <Divider/>
          <br />
          <Grid grow>
            {
              followingData ? (followingData.length > 0 ? followingData?.map((blog,index) => (
                <Grid.Col span={4} key={index}>
                  <Card blog={blog}/>
                </Grid.Col>
              )): <EmptyContent/>):
              isError ? <ErrorSection/>:<LoadingSection/>
            }

          </Grid>
    </Layout>
  )
}

export default Following