import React from 'react'
import { Button, Center, ChevronIcon, Chip, Group, ScrollArea, Title } from 'ui'
import { SunIcon } from 'ui/Icons'

function Setup() {
  return (
    <Center style={{flexDirection:"column",padding:"20px"}}>
      <Title>What to do you like?</Title><br />
       <ScrollArea>
        <Chip.Group position="center" multiple mt={15}>
        {
          [...Array(100)].map(i => (
            <Chip value={i} variant='filled' size='lg'>Multiple chips</Chip>
          ))
        }
      </Chip.Group>
       </ScrollArea>
      <div style={{position:"fixed",bottom:"0",right:"0",padding:"10px",backgroundColor:"red",left:"0",alignItems:"end"}}>
        <Group>
          <Button mt={20} variant='outline'>Next</Button>
        <Button mt={20} rightIcon={<SunIcon/>}>Next</Button>
        </Group>
      </div>
      
    </Center>
  )
}

export default Setup