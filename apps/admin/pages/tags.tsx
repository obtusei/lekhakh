import React from 'react'
import { Divider, Table, Title } from 'ui'
import SimpleCard from 'ui/components/Cards/SimpleCard'
import { GetTags } from '../components/API'
import Layout from '../components/Layout'

function Tags() {
  const tags = GetTags()
  return (
    <Layout>
      <Title>Tags</Title>
      <SimpleCard title='Total tags' sub={tags.data ? `${tags.data.length}`:"0"} />
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
          {
            tags.data ? tags.data.map((tag:any,index:number) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{tag.name}</td>
                <td>{tag._count.blogs}</td>
              </tr>
            )):
            tags.isError ? <>Error</>:<>Loading...</>
          } 
        </tbody>
      </Table>
    </Layout>
  )
}

export default Tags