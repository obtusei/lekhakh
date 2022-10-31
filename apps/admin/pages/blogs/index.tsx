import axios from 'axios'
import React from 'react'
import { mutate } from 'swr'
import { Badge, Button, Divider, Group, Stack, Table, Text, Title } from 'ui'
import SimpleCard from 'ui/components/Cards/SimpleCard'
import { GetAllBlogs, GetFeedbacks } from '../../components/API'
import Layout from '../../components/Layout'


function Blogs() {
  const {blogs,isLoading} = GetAllBlogs() 
  const time = (tim:string) => new Date(tim);
  const deleteFeedback = async (id:string) => {
    try{
      await axios.delete("/report",{data:{id:id}})
      mutate("/feedback")
      
    }
    catch{
      console.log("Couldn't delete the report");
      
    }
  }
  return (
    <Layout>
      <Title>Blogs</Title>
      <br />
      <Group>
        <SimpleCard title='Total Blogs' sub={blogs ? blogs.length:0}/>
      </Group>
      <br />
      <Divider/>
      <br />
      <Table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Report</th>
            <th>By</th>
            <th>At</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            blogs ? blogs.map((feedback:any,index:number) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <Stack spacing={0}>
                    <Title order={4}>{feedback.title}</Title>
                    
                  </Stack>
                </td>
                <td>
                  <Stack spacing={0}>
                    <Text>{feedback.user.name}</Text>
                    <Text color={"dimmed"}>{feedback.user.email}</Text>
                  </Stack>
                </td>
                <td>{time(feedback.updatedAt).toLocaleString()}</td>
                <td>
                  <Badge>{feedback.category.name}</Badge>
                </td>
              </tr>
            )):
            isLoading ? <></>:<></>
          }
        </tbody>
      </Table>
    </Layout>
  )
}

export default Blogs