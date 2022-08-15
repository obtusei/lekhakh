import axios from 'axios'
import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { Card, Divider, Grid, Title } from 'ui'
import WriterCard from 'ui/components/Cards/WriterCard'
import ProfileCard, { UserProfileCardProps, UserProfileCardStringProps } from 'ui/components/Profile/ProfileCard'
import Layout from '../components/Layout'
// import { GetCategories,PostCategories } from '../utils/user-api'
type Props = {}

function Writers({}: Props) {
  // const {categories} = GetCategories()
  // const { mutate } = useSWRConfig()
  // const newCategory = {
  //   name: 'New Category',
  // }
  const user:UserProfileCardProps = {
    image: "",
    name: "string",
    username: "string",
    bio: "string",
    blogCount: 0,
    followerCount: 0,
    followingCount:20
  }
  const data:UserProfileCardStringProps ={
    blogs: "blogs",
    followers: "followers",
    following: "followings",
    follow: "Follow",
    contact: "Contact"
  }
  return (
    <Layout>
      <Title>Writers</Title>
      <br />
      <Divider/>
      <br />
      <Grid>
        {
          [...Array(10)].map((writer,index) => (
            <Grid.Col span={4}>
              <Card shadow={'sm'}>
                <ProfileCard props={user} stringData={data} hideBio/>
              </Card>
            </Grid.Col>
          ))
        }
      </Grid>
        
    </Layout>
  )
}

export default Writers