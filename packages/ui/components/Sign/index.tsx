import { Card, Center, Container,Stack } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import { Logo } from '../../Icons'
import LowerMenu from '../LowerMenu'
import { LogoLink } from '../StateButtons'
import LogIn from './Login'

type Props = {
          children: React.ReactNode
}
export * from "./Login"

export function UserSign({children}: Props) {
  return (
    <Center pt={"40px"}>

          <Container style={{alignItems:"center",display:"flex",flexDirection:"column"}}>
              <LogoLink/>
              
            <Card shadow="sm" p="md" pt={0} mt={'lg'} radius="md" withBorder style={{alignItems:"right"}}>
              <br />
              <Stack align={"center"}>
                {children}
                <LowerMenu/>          
              </Stack>
            </Card>
          </Container>
    </Center>
  )
}

export default UserSign