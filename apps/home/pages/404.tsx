import React from 'react'
import { Button, Center, IconArrowLeft, Stack, Text, Title } from 'ui'
import Layout from '../components/Layout'

function ErrorPage() {
  return (
    <Center style={{height:"100vh"}}>
      <Stack>
        <Title>404</Title>
        <Text color={"dimmed"}>The page you are looking for is not here</Text>
        <Button leftIcon={<IconArrowLeft size={"20px"}/>}>Go Back</Button>
      </Stack>
    </Center>
  )
}

export default ErrorPage