import React from 'react'
import { Divider, Grid, Shell, SimpleGrid, Title } from 'ui'
import CarouselCard from 'ui/components/Cards/Carousel'
import CircleCard from 'ui/components/Cards/CircleCard'
import BlogCard from 'ui/components/Cards/BlogCard'
import ScrollSection from 'ui/components/ScrollSection'
import blogData from 'ui/lib/blogData'
import Layout from '../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { GetSession } from '../api/user'
import { GetHotWriters, GetTrendingBlogs, GetTrendofTheDay } from '../api/blog'
import { ErrorSection, LoadingSection } from '../components/ErrorAndLoading'

export default function Trending() {
  const {t} = useTranslation();
  const router = useRouter();
  const session = GetSession();
  const {hotWriters,isLoading:hotLoading} = GetHotWriters();
  const {trendoftheday,isLoading:trendDayLoading} = GetTrendofTheDay();
  const {trendData,isLoading:trendLoading} = GetTrendingBlogs();
  return (
    <Layout>
          <Title order={2}>{t('common:trending')}</Title>
          <br />
          <Divider/>
          <br />
          <ScrollSection title={t("common:hotWriters")} href='/writers'>
            {
              hotWriters ? hotWriters.map((writer,index) => (
                <CircleCard name={writer.name} image={writer.image != null ? writer.image:''} description={`${writer._count?.blogs} blogs`}/>
              )):
              hotLoading ? <LoadingSection/>:<ErrorSection/>

            }
          </ScrollSection>
          <br />
          
          <Title order={4}>{t('common:trends')}</Title>
          <br />
          <Grid grow>
            {
              trendData ? trendData.map((trend,index) => (
                <Grid.Col span={4} key={index}>
                <BlogCard props={trend} session={session} isSmall={true} index={index}/>
              </Grid.Col>
              )):
              trendLoading ? <LoadingSection/>:<ErrorSection/>
            }
          </Grid>
    </Layout>
  )
}