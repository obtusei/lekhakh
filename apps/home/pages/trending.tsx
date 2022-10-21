import React from 'react'
import { Divider, Grid, Title } from 'ui'
import CircleCard from 'ui/components/Cards/CircleCard'
import ScrollSection from 'ui/components/ScrollSection'
import Layout from '../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import { GetHotWriters, GetTrendingBlogs} from '../api/blog'
import { ErrorSection, LoadingSection } from '../components/ErrorAndLoading'
import Card from '../components/Card'

export default function Trending() {
  const {t} = useTranslation();
  const {hotWriters,isLoading:hotLoading} = GetHotWriters();
  const {trendData,isLoading:trendLoading} = GetTrendingBlogs();
  return (
    <Layout>
          <Title order={2}>{t('common:trending')}</Title>
          <br />
          <Divider/>
          <br />
          <ScrollSection title={t("common:hotWriters")} href='/writers'>
            {
              hotWriters ? hotWriters.map((writer,index:number) => (
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
              trendData ? trendData.map((trend,index:number) => (
                <Grid.Col span={4} key={index}>
                  <Card blog={trend} isSmall index={index+1}/>
              </Grid.Col>
              )):
              trendLoading ? <LoadingSection/>:<ErrorSection/>
            }
          </Grid>
    </Layout>
  )
}