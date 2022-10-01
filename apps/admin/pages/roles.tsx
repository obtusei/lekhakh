import React, { useState } from 'react'
import { Avatar, Button, Card, Divider, Group, Stack, Table, Text, TextInput, Title } from 'ui'
import Layout from '../components/Layout'

type Props = {}

function Roles() {
  const [user,setUser] = useState("")
  const handleSearch = () => {

  }
  return (
    <Layout>
      <Title>Roles</Title>
      <br />
      <Group align={"flex-end"}>
        <TextInput
        title='Search for user'
        placeholder='Search by username and name'
        description="Give a role for an user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
        <Button onClick={handleSearch}>Look</Button>
      </Group>
      <br />
      <Divider label={`Search results for "${user}"`} labelPosition='center' />
      <br />
      <Card withBorder>
        <Group style={{justifyContent:"space-between"}}>
          <Group>
            <Avatar size={"sm"}>AB</Avatar>
            <Stack spacing={0}>
              <Title order={5}>Abhishek Bhatta</Title>
              <Text color="dimmed">@abhishek</Text>
            </Stack>
          </Group>
          <Button variant='light'>Make admin</Button>
        </Group>
      </Card>
      <br />
      <Divider label="ADMINS" labelPosition='center'/>
      <br />
      <Table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>abhi</td>
            <td>Abhishek Bhatta</td>
            <td>abhishekbhatta</td>
            <td>USER</td>
            <td>
              <Button>Change Role</Button>
            </td>
          </tr>
        </tbody>
      </Table>   
    </Layout>
  )
}

export default Roles