import axios from 'axios'
import React from 'react'
import { mutate } from 'swr'
import { Button, Divider, Group, Stack, Table, Text, Title } from 'ui'
import SimpleCard from 'ui/components/Cards/SimpleCard'
import { GetFeedbacks } from '../components/API'
import Layout from '../components/Layout'

type Props = {}

function Feedback({}: Props) {
  const {feedbacks,isLoading} = GetFeedbacks() 
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
      <Title>Feedbacks</Title>
      <br />
      <Group>
        <SimpleCard title='Total Feedbacks' sub={feedbacks ? feedbacks.length:0}/>
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            feedbacks ? feedbacks.map((feedback:any,index:number) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <Stack spacing={0}>
                    <Title order={4}>{feedback.title}</Title>
                    <Text color={"dimmed"} lineClamp={2}>{feedback.message}</Text>
                  </Stack>
                </td>
                <td>
                  <Stack spacing={0}>
                    <Text>{feedback.name}</Text>
                    <Text color={"dimmed"}>{feedback.email}</Text>
                  </Stack>
                </td>
                <td>{time(feedback.postedAt).toLocaleString()}</td>
                <td>
                  <Button variant='subtle' onClick={() => deleteFeedback(feedback.id)}>Delete</Button>
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

export default Feedback