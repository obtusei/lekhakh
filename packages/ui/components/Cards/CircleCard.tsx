import { Avatar,Card,Stack,Text } from '@mantine/core'
import Link from "next/link";
import React from 'react'

interface CircleCardProps{
  image:string
  name:string
  description:string
}

function CircleCard(props:CircleCardProps) {
  return (
    <Link href={`/${props.name}`}>
    <Card p={0}>
      <Stack spacing={0} style={{alignItems:"center"}}>
        <Avatar size="lg" src={props.image} radius={40} alt={props.name}/>
        <Text >{props.name}</Text>
        <Text size={'xs'} color={'dimmed'}>{props.description}</Text>
      </Stack>
    </Card>
    </Link>
  )
}

export default CircleCard