import React from 'react'
import {Button, Card,Group,Stack,Text,Title} from "@mantine/core"
import { IconArrowRight } from '../..'
import {useRouter} from "next/router"

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

export function SimpleCardButton({title,sub}: Props) {
  const router = useRouter()
  return (
    <Card shadow="xs" p="md" radius="md">
      <Stack spacing={0}>
        <Text color={'dimmed'}>{title}</Text>
        <Title order={3}>{sub}</Title>
        <Group align={"end"} style={{justifyContent:"flex-end"}}>
          <Button variant="light" onClick={() => {
              const data = title.split(" ")[1].toLocaleLowerCase()
              router.push(`/${data}`)            
          }}>See {title.split(" ")[1]} <IconArrowRight size={18}/></Button>
        </Group>
      </Stack>
    </Card>
  )
}



export default SimpleCard