import React from 'react'
import {Title } from 'ui'
import BlogCard from 'ui/components/Cards/BlogCard'
import ScrollSection from 'ui/components/ScrollSection'
import blogData from 'ui/lib/blogData'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import { GetSession } from '../../api/user'
import { GetDiscoverBlogs } from '../../api/blog'
import { IBlog } from 'ui/lib/interfaces'
import { ErrorSection, LoadingSection } from '../../components/ErrorAndLoading'

function Discover() {
  const router = useRouter();
  const {t} = useTranslation();
  const {session} = GetSession();
  const {discoverData,isLoading,isError} = GetDiscoverBlogs();
  return (
    <Layout>
          <Title>{t('common:discover')}</Title>
          <br />
          {
            isLoading ? <LoadingSection/>: isError ? <ErrorSection/> : (
            discoverData.map((cat) => (
              <ScrollSection title={cat.name} href={`/category/${cat.name.toLowerCase()}`}>
                {
                  cat.blogs.map((blog:IBlog) => (
                    <BlogCard props={blog} session={session}/>
                  ))
                }
                </ScrollSection>
            )))
          }
    </Layout>
  )
}

export default Discover