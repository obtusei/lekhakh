import React from 'react'
import { Avatar, Button, Group, Stack, Input, Switch,Text, Box, Textarea } from 'ui'
import Layout from '../components/Layout'

function Settings() {
  return (
    <Layout>
      <Box style={{width:"400px"}}>
        <Stack align={"center"} spacing={0}>
        <Avatar size={'xl'} radius={200} color="red">AB</Avatar>
        <Button variant='white'>Change Profile</Button>
      </Stack>
      <Stack>
        <Input.Wrapper label="Your Name" description="Help people discover your account by using the name you're known by: either your full name, nickname, or business name.">
        <Input placeholder="Your phone" />
      </Input.Wrapper>

      <Input.Wrapper label="Username" description="Your username must be unique.">
        <Input placeholder="Your phone" />
      </Input.Wrapper>

      <Input.Wrapper label="Email">
        <Input placeholder="Your phone" />
      </Input.Wrapper>

      <Textarea
      placeholder="Your Bio"
      label="Your Bio"
      />

      <Text>Date of birth haii</Text>
      <Switch
      label="Make account Private"
      />

      <Switch
      label="Be Writer"
      />

      <Button variant='subtle'>Change Password</Button>

      <Button>Save</Button>
      </Stack>
      </Box>
    </Layout>
  )
}

export default Settings