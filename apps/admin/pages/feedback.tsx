import React from 'react'
import { Button, Divider, Group, Stack, Table, Text, Title } from 'ui'
import SimpleCard from 'ui/components/Cards/SimpleCard'
import Layout from '../components/Layout'

type Props = {}

function Feedback({}: Props) {
  return (
    <Layout>
      <Title>Feedbacks</Title>
      <br />
      <Group>
        <SimpleCard title='Total Feedback' sub="1200"/>
        <SimpleCard title='Total Reports' sub="1200"/>
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
            <th>Greet</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <Stack spacing={0}>
                <Title order={4}>Something is not right?</Title>
                <Text color={"dimmed"} lineClamp={2}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet enim in ipsa suscipit maxime nihil est tenetur harum dolor porro. Quos ex dicta culpa blanditiis eum quas hic rem alias.</Text>
              </Stack>
            </td>
            <td>Abhishek bhatta</td>
            <td>23 May, 2022 at 12:30pm</td>
            <td>
                <Button variant='filled'>Thanks</Button>
            </td>
            <td>
              <Button variant='subtle'>Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  )
}

export default Feedback