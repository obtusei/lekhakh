import React from 'react'
import useSWR, { mutate } from 'swr'
import { Button, Divider, Group, Stack, Table, Text, Title } from 'ui'
import SimpleCard from 'ui/components/Cards/SimpleCard'
import { GetReports } from '../components/API'
import Layout from '../components/Layout'
import axios from "axios"

type Props = {}

function Reports({}: Props) {
  
  const {reports,isError} = GetReports()
  const time = (tim:string) => new Date(tim);
  const deleteReport = async (id:string) => {
    try{
      await axios.delete("/report",{data:{id:id}})
      mutate("/report")
      
    }
    catch{
      console.log("Couldn't delete the report");
      
    }
  }

  return (
    <Layout>
      <Title>Reports</Title>
      <br />
      <Group>
        <SimpleCard title='Total Reports' sub="1200"/>
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
            <th>Resolve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            reports ? reports.map((report,index) => (
              <tr key={index}>
                <td>{report.id}</td>
                <td>
                  <Stack spacing={0}>
                    <Title order={4}>{report.title}</Title>
                    <Text color={"dimmed"} lineClamp={2}>{report.message}</Text>
                  </Stack>
                </td>
                <td>{report.email}</td>
                <td>{time(report.postedAt).toLocaleString()}</td>
                <td>
                    <Button variant='filled'>Resolve</Button>
                </td>
                <td>
                  <Button variant='subtle' onClick={() => deleteReport(report.id)}>Delete</Button>
                </td>
              </tr>
            )):
            isError ? <tr>Error</tr>: <tr>Loading</tr>
          }
        </tbody>
      </Table>
    </Layout>
  )
}

export default Reports