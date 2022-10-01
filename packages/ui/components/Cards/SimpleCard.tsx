import React from 'react'
import {Card,Stack,Text,Title} from "@mantine/core"

type Props = {
  title:string,
  sub:string
}

function SimpleCard({title,sub}: Props) {
  return (
    <Card shadow="xs" p="md" radius="md">
      <Stack spacing={0}>
        <Text color={'dimmed'}>{title}</Text>
        <Title order={3}>{sub}</Title>
      </Stack>
    </Card>
  )
}

export default SimpleCard