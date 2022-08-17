import { CloseButton, Container, Group, Stack, Text, Title } from '@mantine/core'
import React from 'react'

type Props = {}

function TopAlert({}: Props) {
  return (
    <div style={{backgroundColor:"red",width:"100%",padding:"10px",zIndex:"1000"}}>
      <Group style={{justifyContent:"space-between",color:"white"}}>
        <Stack spacing={0}>
          <Title order={3}>Verify you Email</Title>
          <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto illo provident deleniti!</Text>
        </Stack>
        <CloseButton variant='subtle'/>
      </Group>
    </div>
  )
}

export default TopAlert