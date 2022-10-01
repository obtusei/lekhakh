import React from 'react'
import { Divider, Table, Title } from 'ui'
import SimpleCard from 'ui/components/Cards/SimpleCard'
import Layout from '../components/Layout'

function Tags() {
  return (
    <Layout>
      <Title>Tags</Title>
      <SimpleCard title='Total tags' sub='1200' />
      <br />
      <Divider/>
      <br />
      <Table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Title</th>
            <th>Blog Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Hello World</td>
            <td>23</td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  )
}

export default Tags