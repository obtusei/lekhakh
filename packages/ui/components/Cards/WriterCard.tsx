import { Avatar, Card, Group, Text,Title,Stack, Button, CheckIcon } from '@mantine/core'
import React from 'react'
import { TickIcon } from '../../Icons'



function WriterCard() {
  return (
    <Card shadow="sm" p="md" radius="md" style={{width:"100%",backgroundColor:"rgba(243,23,32,0.1)"}}>
      <Group align={"top"} style={{justifyContent:"space-between"}}>
        <Stack>
        <Group>
        <Avatar src={''} alt="Abhishek Bhatta" size={'lg'}/>
        <Stack spacing={0}>
          <Title order={2}>Abhishek Bhatta</Title>
          <Text>@abhishek</Text>
          <Group>
            <Text><span style={{fontWeight:"bold"}}>22</span>blogs</Text>
            <Text><span style={{fontWeight:"bold"}}>22</span>follower</Text>
            <Text><span style={{fontWeight:"bold"}}>22</span>followings</Text>
          </Group>
        </Stack>
      </Group>
      <Group>
          <Button variant='outline'>Follow</Button>
          <Button variant='subtle'>Contact</Button>
      </Group>
      </Stack>
      <TickIcon/>
      </Group>
      
      
    </Card>
  )
}

export default WriterCard