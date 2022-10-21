import React from 'react'
import { Divider, Grid, Group, Text, Title } from 'ui'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import axios from 'axios'
import ScrollSection from 'ui/components/ScrollSection'
import CircleCard from 'ui/components/Cards/CircleCard'
import { ErrorSection, LoadingSection } from '../../components/ErrorAndLoading'
import { GetCategoryBlogAndWriter } from '../../api/blog'
import { GetStaticProps } from 'next'
import { IBlog, ICategory, IUser } from 'ui/lib/interfaces'
import { GetSession } from '../../api/user'
import BlogCard from 'ui/components/Cards/BlogCard'
import Card from '../../components/Card'
import EmptyContent from '../../components/EmptyContent'
import useTranslation from 'next-translate/useTranslation'

function capitalizeFirstLetter(word:string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


export async function getStaticPaths() {
  const response = await axios.get('/admin/categories')
  const categories = response.data
  const paths = categories.map((category:ICategory) => ({
    params: {
      name:category.name.toString().toLowerCase()
    }
  }))
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = (context) => {
  const category = context?.params?.name
  return {
    props: { 
      category:category
    },
  }
}

interface Writers{
  user:IUser
}

function Category({category}:{category:string}) {
  const { blogs,writers, blogError,writerError} = GetCategoryBlogAndWriter(category)
  const {session} = GetSession()
  const {t} = useTranslation("other")
  const router = useRouter()
  return (
    <Layout>
      <Group>
        <Title>{capitalizeFirstLetter(String(router.query.name))}</Title>
      </Group><br />
      <ScrollSection title="Writers" href='/writers'>
        {
          writers ? (writers.blogs.length != 0 ? writers.blogs.map((writer:Writers,index:number) => (
            <CircleCard name={writer.user.name} image={ writer.user.image != null ? writer.user.image:''} description={t("nBlogs",{count:writer.user._count?.blogs})}/>
          )):<EmptyContent/>):
          writerError ? <ErrorSection/>:<LoadingSection/>
        }
      </ScrollSection>
      <br/>
      <Title order={4}>Blogs</Title>
      <br />
      <Grid grow>
        {
          blogs ? (blogs.blogs.length != 0 ? blogs.blogs.map((blog:IBlog,index:number) => (
            <Grid.Col span={4} key={index}>
              <Card blog={blog}/>
            </Grid.Col>
          )):<EmptyContent/>):
           blogError ? <ErrorSection/>:<LoadingSection/>
        }
      </Grid>
    </Layout>
  )
}

export default Category