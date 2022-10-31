import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { Card, Divider, Grid, Title } from 'ui'
import WriterCard from 'ui/components/Cards/WriterCard'
import ProfileCard, { UserProfileCardStringProps } from 'ui/components/Profile/ProfileCard'
import ScrollSection from 'ui/components/ScrollSection'
import { ICategory, IUser } from 'ui/lib/interfaces'
import { GetWriters } from '../api/blog'
import { DoesFollow, followSomeone, GetSession, GetUserbyUsername } from '../api/user'
import { ErrorSection, LoadingSection } from '../components/ErrorAndLoading'
import Layout from '../components/Layout'
import { LoginModal } from '../components/LoginModal'
// import { GetCategories,PostCategories } from '../utils/user-api'
type Props = {}

function Writers({}: Props) {
  
  const {t} = useTranslation()
  const {writerData,isLoading,isError} = GetWriters()
  const {session} = GetSession()
  const [openLogin,setOpenLogin] = useState(false)
  const doesFollow = (id:string) => {return DoesFollow(id)}
  const userData = (userName:string) => {return GetUserbyUsername(userName)}
  const data:UserProfileCardStringProps ={
    blogs: "blogs",
    followers: "followers",
    following: "followings",
    follow: "Follow",
  }
  return (
    <Layout>
      <LoginModal myVar={openLogin} setMyVar={setOpenLogin}/>
      <Title>{t('common:writers')}</Title>
      <br />
      {
        isLoading ? <LoadingSection/>: isError ? <ErrorSection/> : (
        writerData?.map((cat:ICategory,index:number) => (
          <div key={index}>
            <ScrollSection title={cat.name} href={`/category/${cat.name.toLowerCase()}`}>
            {
              cat.blogs?.map((user:{user:IUser},index:number) => (
                  <Link href={`/${user.user.username}`} key={index}>
                <Card shadow={'lg'} withBorder style={{minWidth:"400px"}}>
                  <ProfileCard props={user.user} session={session} stringData={data} onFollowClick={() => session && session.user ? followSomeone(userData(user.user.username).userData,doesFollow(user.user.id)):setOpenLogin(true)} hideBio hideFollow/>
                </Card>
                  </Link>
              ))
            }
            </ScrollSection>
          </div>
        )))
      }
    </Layout>
  )
}

export default Writers