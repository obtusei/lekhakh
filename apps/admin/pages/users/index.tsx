import React from 'react'
import Layout from '../../components/Layout'
import TableSort,{datum} from "ui/components/Table";
import { Button, Card, Center, Divider, Group, Paper, Title,Text, Stack, Grid } from 'ui';
import { GetAllUsers } from '../../components/API';

function Users() {
   const { user, isLoading, isError } = GetAllUsers()
   
  // if (isError) return <div>Fail to load</div>
  return (
    <Layout>
      <Title>Users</Title>
      <br />
      <Grid>
        <Card shadow="xs" p="md" radius="md" withBorder>
          <Stack spacing={0}>
            <Text color={'dimmed'}>Total Users</Text>
            <Title order={3}>{user ? user.data.length:0}</Title>
          </Stack>
        </Card>
      </Grid>
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