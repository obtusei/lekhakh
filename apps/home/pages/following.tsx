import useTranslation from 'next-translate/useTranslation'
import React,{useEffect} from 'react'
import { Grid,Title, Shell, SimpleGrid, Divider,Text } from 'ui'
import BlogCard from 'ui/components/Cards/BlogCard'
import ShortcutLists from 'ui/components/ShortcutLists'
import blogData from 'ui/lib/blogData'
import { GetUserFollowingBlogs } from '../api/blog'
import { GetSession } from '../api/user'
import Layout from '../components/Layout'

function Following() {
  const followers = 313
  const session = GetSession();
  const {followingData} = GetUserFollowingBlogs();
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
              followingData?.map((blog) => (
                <Grid.Col span={4}>
                  <BlogCard props={blog} session={session}/>
                </Grid.Col>
              ))
            }

          </Grid>
    </Layout>
  )
}

export default Following