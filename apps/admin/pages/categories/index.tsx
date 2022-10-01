import React, { useState } from 'react'
import { Divider, Title,Table, TextInput, Button, Group, Text, Stack } from 'ui'
import Layout from '../../components/Layout'

function Categories() {
  const [newCat,setNewCat] = useState("");
  const addCategory = () => {

  }

  return (
    <Layout>
      <Stack spacing={0}>
        <Title>Categories</Title>
        <Text color={"gray"} weight="bold">Total: {12}</Text>
      </Stack>
      <Divider/>
      <br />
      <Title order={4}>Add Category</Title>
      <Group align={"flex-end"}>
        <TextInput
          title='Enter the category title'
          placeholder='Science and Technology'
          description="Add an unique category for user to choose from"
          variant="filled"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          
        />
        <Button onClick={addCategory}>Add</Button>
      </Group>
      <br />
      <Divider/>
      <br />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            [1,2,3,4,5].map((cat,index) => ( 
            <tr key={index}>
              <td>1</td>
              <td>Abhishek Bhatta</td>
              <td>
                <Button variant='white'>Delete</Button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </Layout>
  )
}

export default Categories