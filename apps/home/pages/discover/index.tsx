import React from 'react'
import {Title } from 'ui'
import BlogCard from 'ui/components/Cards/BlogCard'
import ScrollSection from 'ui/components/ScrollSection'
import blogData from 'ui/lib/blogData'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import useTranslation from 'next-translate/useTranslation'

function Discover() {
  const router = useRouter();
  const {t} = useTranslation();
  return (
    <Layout>
          <Title>{t('common:discover')}</Title>
          <br />
          
          <ScrollSection title='Local' href="/discover/local" seeMore={t('common:seeMore')}>
            {
              [...Array(10)].map((blog,index) => (
                <BlogCard {...blogData[0]}/>
              ))
            }
          </ScrollSection>
    </Layout>
  )
}

export default Discover