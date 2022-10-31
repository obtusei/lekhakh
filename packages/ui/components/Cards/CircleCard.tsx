import { Avatar,Card,Stack,Text } from '@mantine/core'
import Link from "next/link";
import { getInitial } from '../../lib/logics';

interface CircleCardProps{
  image:string
  name:string
  description:string,
  username:string
}

function CircleCard(props:CircleCardProps) {
  return (
    <Link href={`/${props.username}`}>
    <Card p={0} style={{cursor:"pointer",backgroundColor:"transparent"}}>
      <Stack spacing={0} style={{alignItems:"center"}}>
        <Avatar size="lg" src={props.image} radius={40} alt={props.name} draggable={false}>{getInitial(props.name)}</Avatar>
        <Text >{props.name}</Text>
        <Text size={'xs'} color={'dimmed'}>{props.description}</Text>
      </Stack>
    </Card>
    </Link>
  )
}

export default CircleCard