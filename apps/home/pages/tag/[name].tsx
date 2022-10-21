import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { Divider, Grid, Text, Title } from 'ui'
import { IBlog, ITag } from 'ui/lib/interfaces'
import { GetSession } from '../../api/user'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
export const getStaticPaths:GetStaticPaths = async () =>{
  const response = await axios.get('/admin/tags')
  const tags = response.data
  const paths = tags.map((tag:ITag) => ({
    params: {
      name:tag.name.toString().toLowerCase()
    }
  }))
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  }
  
}

export const getStaticProps: GetStaticProps = async (context) => {
  const name = context?.params?.name
  const res = await axios.get(`/admin/tags/${name}`)
  const tag = await res.data
  return {
    props: { 
      tag:tag,
    },
  }
}

function Tag({tag}:any) {
  const {session} = GetSession()
  return (
    <Layout>
      <Title>#{tag.name}</Title>
      <Text color={"dimmed"}>1200 blogs</Text>
      <Divider/>
      <br />
      <Grid grow>
        {
          tag.blogs.map((blog:IBlog,index:number) => (
            <Grid.Col span={4} key={index}>
              <Card blog={blog}/>
            </Grid.Col>
          ))
        }
      </Grid>
    </Layout>
  )
}

export default Tag