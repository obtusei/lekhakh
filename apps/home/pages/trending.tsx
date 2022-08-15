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

export default function Trending() {
  const {t} = useTranslation();
  const router = useRouter();
  return (
    <Layout>
          <Title order={2}>{t('common:trending')}</Title>
          <br />
          <Divider/>
          <br />
          <ScrollSection title={t("common:hotWriters")} href='/writers' seeMore=''>
            {
              [...Array(10)].map((writer,index) => (
                <CircleCard name='Abhishek' image='' description='20 blogs'/>
              ))
            }
          </ScrollSection>
          <br />
          <ScrollSection title='Trend of the day' href='/trend' seeMore=''>
            {
              [...Array(10)].map((blog,index) => (
                <CarouselCard 
                  image='https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80' 
                  title='Love' 
                  category='Poem'
                  readMore={
                    () => router.push(`/${blog.id}`)
                  }
                  />
              ))
            }
          </ScrollSection>
          <br />
          <Title order={4}>{t('common:trends')}</Title>
          <br />
          <Grid>
            <Grid.Col span={4}><BlogCard {...blogData[0]} isSmall/></Grid.Col>
          </Grid>
    </Layout>
  )
}