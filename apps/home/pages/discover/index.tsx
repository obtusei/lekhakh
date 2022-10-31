import {Title } from 'ui'
import ScrollSection from 'ui/components/ScrollSection'
import Layout from '../../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import { GetDiscoverBlogs } from '../../api/blog'
import { IBlog, ICategory } from 'ui/lib/interfaces'
import { ErrorSection, LoadingSection } from '../../components/ErrorAndLoading'
import Card from '../../components/Card'

function Discover() {
  const {t} = useTranslation();
  const {discoverData,isLoading,isError} = GetDiscoverBlogs();
  return (
    <Layout>
          <Title>{t('common:discover')}</Title>
          <br />
          {
            isLoading ? <LoadingSection/>: isError ? <ErrorSection/> : (
            discoverData.map((cat:ICategory,index:number) => (
              <div key={index}>
                <ScrollSection title={cat.name} href={`/category/${cat.name.toLowerCase()}`}>
                {
                  cat.blogs?.map((blog:IBlog) => (
                    <Card blog={blog}/>
                  ))
                }
                </ScrollSection>
              </div>
            )))
          }
    </Layout>
  )
}

export default Discover