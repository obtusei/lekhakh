import React from 'react'
import { Breadcrumbs, Grid, Group, Shell, SimpleGrid, Title } from 'ui'
import { useRouter } from 'next/router'
import BlogCard from 'ui/components/Cards/BlogCard'
import blogData from 'ui/lib/blogData'
import Layout from '../../components/Layout'

function DiscoverType() {
  const router = useRouter()
  return (
    <Layout>
      <Group>
        <Title>{router.query.name}</Title>
      </Group><br />
      <Grid grow>
        <Grid.Col span={4}><BlogCard {...blogData[0]}/></Grid.Col>
      </Grid>
    </Layout>
  )
}

export default DiscoverType