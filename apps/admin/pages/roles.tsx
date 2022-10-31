import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { mutate } from 'swr'
import { Avatar, Button, Card, Center, Divider, Group, Stack, Table, Text, TextInput, Title } from 'ui'
import { GetAllAdmins, SearchUsers } from '../components/API'
import Layout from '../components/Layout'

type Props = {}

function Roles() {
  const [user,setUser] = useState("")
  const [users,setUsers] = useState([])
  const admins = GetAllAdmins()
  const handleSearch = () => {
    axios.get("/user/search?q=" + user,{withCredentials:true})
    .then((res) => {
      setUsers(res.data)
    })
    .catch((err) => {
      console.log("ERROR")
    })
  }

  const handleChangeRole = (id:string,del:boolean) => {
    if (del){
      axios.delete("/admin/users/admin/" + id,{withCredentials:true})
      .then((res) => {
        mutate("/admin/users/admin")
      })
      .catch((err) => {
        console.log("ERROR aayo")
      })
    }else{
      axios.post("/admin/users/admin/" + id,{withCredentials:true})
      .then((res) => {
        mutate("/admin/users/admin")
      })
      .catch((err) => {
        console.log("ERROR aayo")
      })
    }

    
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
      {
        users.length != 0 ? <Divider label={`Search results for "${user}"`} labelPosition='center' />:<></>
      }

      <br />
      <Stack spacing={2}>
      {
        users.length != 0 ? users.map((searchedUser:any,index) => (
          searchedUser.role != "ADMIN" ? <Card withBorder key={index}>
            <Group style={{justifyContent:"space-between"}}>
              <Group>
                <Avatar size={"sm"}>AB</Avatar>
                <Stack spacing={0}>
                  <Title order={5}>{searchedUser?.name}</Title>
                  <Text color="dimmed">@{searchedUser?.username}</Text>
                </Stack>
              </Group>
              <Button variant='light' onClick={() => handleChangeRole(searchedUser.id,false)}>Make admin</Button>
            </Group>
          </Card>:<Center>Not Found</Center> 
        )):<Center> </Center> 
      }
      </Stack>
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
          {
            admins.user ? admins.user.map((admin:any,index:number) => (
              <tr>
                <td>{index+1}</td>
                <td>{admin.username}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <Button onClick={() => handleChangeRole(admin.id,true)}>Remove</Button>
                </td>
            </tr>
            )):
            admins.isLoading ? <tr>Loading</tr>:<tr>Error</tr>
          }
        </tbody>
      </Table>   
    </Layout>
  )
}

export default Roles