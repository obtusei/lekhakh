import { Avatar,Card,Stack,Text } from '@mantine/core'
import React from 'react'

interface CircleCardProps{
  image:string
  name:string
  description:string
}

function CircleCard(props:CircleCardProps) {
  return (
    <Card p={0}>
      <Stack spacing={0} style={{alignItems:"center"}}>
        <Avatar size="lg" src={props.image} radius={40}/>
        <Text >{props.name}</Text>
        <Text size={'xs'} color={'dimmed'}>{props.description}</Text>
      </Stack>
    </Card>
  )
}

export default CircleCard