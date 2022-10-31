import axios from 'axios';
import React, { useState } from 'react'
import { mutate } from 'swr';
import { Divider, Title,Table, TextInput, Button, Group, Text, Stack } from 'ui'
import { GetCategories } from '../../components/API';
import Layout from '../../components/Layout'

function Categories() {
  const [newCat,setNewCat] = useState("");
  const [doesCatExist,setDoesCatExist] = useState(false);
  const categories = GetCategories();

  const addCategory = () => {
    try{
      axios.post("/admin/categories",{name:newCat},{withCredentials:true})
      .then((res) => {
        mutate("/admin/categories")
        console.log(res.data)
      })
      .catch((err) => {
        setDoesCatExist(true)
      })
    }
    catch{
      console.log("ERROR")
    }
  }

  const deleteCategory = (id:string) => {
    try{
      axios.delete(`/admin/categories/${id}`,{withCredentials:true})
      .then((res) => {
        mutate("/admin/categories")
        console.log(res.data)
      })  
    }
    catch{
      console.log("ERROR")
    }
  }

  return (
    <Layout>
      <Stack spacing={0}>
        <Title>Categories</Title>
        <Text color={"gray"} weight="bold">Total: {categories.data ? categories.data.length:0}</Text>
      </Stack>
      <Divider/>
      <br />
      <Title order={4}>Add Category</Title>
      <Group align={"center"}>
        <TextInput
          title='Enter the category title'
          placeholder='Science and Technology'
          description="Add an unique category for user to choose from"
          variant="filled"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          error={doesCatExist ? "Category exists already":null}
          onKeyDown={(e) => setDoesCatExist(false)}
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
            categories.data ? categories.data?.map((cat:any,index:number) => ( 
            <tr key={index}>
              <td>{index+1}</td>
              <td>{cat.name}</td>
              <td>
                <Button variant='white' onClick={() => deleteCategory(cat.id)}>Delete</Button>
              </td>
            </tr>
          )):
          categories.isError ? <>Error</>:<>Loading</>
          }
        </tbody>
      </Table>
    </Layout>
  )
}

export default Categories