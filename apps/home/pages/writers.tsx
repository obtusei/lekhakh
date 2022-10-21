import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { Card, Divider, Grid, Title } from 'ui'
import WriterCard from 'ui/components/Cards/WriterCard'
import ProfileCard, { UserProfileCardStringProps } from 'ui/components/Profile/ProfileCard'
import ScrollSection from 'ui/components/ScrollSection'
import { ICategory, IUser } from 'ui/lib/interfaces'
import { GetWriters } from '../api/blog'
import { ErrorSection, LoadingSection } from '../components/ErrorAndLoading'
import Layout from '../components/Layout'
// import { GetCategories,PostCategories } from '../utils/user-api'
type Props = {}

function Writers({}: Props) {
  
  const {t} = useTranslation()
  const {writerData,isLoading,isError} = GetWriters()
  
  const data:UserProfileCardStringProps ={
    blogs: "blogs",
    followers: "followers",
    following: "followings",
    follow: "Follow",
  }
  return (
    <Layout>
      <Title>{t('common:writers')}</Title>
      <br />
      {
        isLoading ? <LoadingSection/>: isError ? <ErrorSection/> : (
        writerData?.map((cat:ICategory) => (
          <ScrollSection title={cat.name} href={`/category/${cat.name.toLowerCase()}`}>
            {
              cat.blogs?.map((user:{user:IUser}) => (
                <Card shadow={'lg'} withBorder style={{maxWidth:"450px"}}>
                  <ProfileCard props={user.user} stringData={data}/>
                </Card>
              ))
            }
            </ScrollSection>
        )))
      }
    </Layout>
  )
}

export default Writers