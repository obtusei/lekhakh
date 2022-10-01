import React from 'react'
import Layout from '../../components/Layout'
import TableSort,{datum} from "ui/components/Table";
import { Button, Card, Center, Divider, Group, Paper, Title,Text, Stack, Grid, CheckIcon } from 'ui';
import { GetAllUsers } from '../../components/API';
import SimpleCard from 'ui/components/Cards/SimpleCard';

function Users() {
   const { user, isLoading, isError } = GetAllUsers()
   
  // if (isError) return <div>Fail to load</div>
  return (
    <Layout>
      <Title>Users</Title>
      <br />
      <Group>
        <SimpleCard title='Total Users' sub={`${user ? user.data.length:0}`}/>
        <SimpleCard title='Total Users' sub={`${user ? user.data.length:0}`}/>
        <SimpleCard title='Total Users' sub={`${user ? user.data.length:0}`}/>
      </Group>
      <br />
      <Divider/>
      <br />
      <Center style={{flexDirection:"column"}}>
        {
        user ? <TableSort {...user}/> : <TableSort {...datum} />
        }
      <br />
      <Button>Load More</Button>
      </Center>
    </Layout>
  )
}

export default Users