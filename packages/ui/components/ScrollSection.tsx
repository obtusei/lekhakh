import React, { ReactNode } from 'react'
import { createStyles,Group, ScrollArea,Button, Stack, Title, ActionIcon } from '@mantine/core'
import { IconChevronDownRight, IconChevronRight } from '@tabler/icons'
import { useRouter } from 'next/router';

const useStyles = createStyles(theme => ({
          scrollbar:{
                    display:"none"
          }
}))

interface Props{
  children: ReactNode,
  title:string,
  href:string
}
function ScrollSection({children,title,href}:Props) {
          const {classes} = useStyles()
          const router = useRouter();
  return (
    <div>
          <Group style={{justifyContent:"space-between"}}>
                    <Title order={4}>{title}</Title>
                    <ActionIcon aria-label='See More' onClick={() => router.push(`/${href}`)}><IconChevronRight/></ActionIcon>
          </Group>
          
                   <ScrollArea classNames={{scrollbar:classes.scrollbar}}  style={{ width: "100%",padding:"20px"}}>
                     <Stack style={{flexDirection:"row"}}>
                      {children}     
                    </Stack>
                   </ScrollArea>
    </div>
  )
}

export default ScrollSection