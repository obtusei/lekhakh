import { useRouter } from 'next/router'
import React from 'react'
import { Title,Text,Tabs } from 'ui'
import Layout from '../components/Layout'

type Props = {}

function Search() {
  const router = useRouter()
  return (
    <Layout>
      <Title>Search</Title>
      <Text>Search term for {`"${router.query.q}"`}</Text>
      <br />
      <Tabs defaultValue="blogs">
      <Tabs.List>
        <Tabs.Tab value="blogs">Blogs</Tabs.Tab>
        <Tabs.Tab value="category">Category</Tabs.Tab>
        <Tabs.Tab value="saved">Dates</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
    </Layout>
  )
}

export default Search