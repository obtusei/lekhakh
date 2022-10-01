import React from 'react'
import { Title } from 'ui'
import SimpleCard from 'ui/components/Cards/SimpleCard'
import Layout from '../../components/Layout'

function Blogs() {
  return (
    <Layout>
      <Title>Blogs</Title>
      <br />
      <SimpleCard title='Hello' sub='Love'/>
    </Layout>
  )
}

export default Blogs