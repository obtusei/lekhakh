import React from 'react'
import { Grid,Title, Shell, SimpleGrid, Divider,Text } from 'ui'
import BlogCard from 'ui/components/Cards/BlogCard'
import ShortcutLists from 'ui/components/ShortcutLists'
import blogData from 'ui/lib/blogData'
import Layout from '../components/Layout'

function Following() {
          const followers = 313
  return (
    <Layout>
          <Title>Following</Title>
          <Text color="dimmed">From {followers} follwers you have</Text>
          <br />
          <Divider/>
          <br />
          {/* <Grid grow>
            <Grid.Col span={4}>
              <BlogCard {...blogData[0]}/>
            </Grid.Col>
            <Grid.Col span={4}>
              <BlogCard {...blogData[0]}/>
            </Grid.Col>
            <Grid.Col span={4}>
              <BlogCard {...blogData[0]}/>
            </Grid.Col>
            <Grid.Col span={4}>
              <BlogCard {...blogData[0]}/>
            </Grid.Col>
            <Grid.Col span={4}>
              <BlogCard {...blogData[0]}/>
            </Grid.Col>
          </Grid> */}
          <ShortcutLists/>
    </Layout>
  )
}

export default Following