import { ActionIcon } from '@mantine/core'
import { IconHeart } from '@tabler/icons'
import React, { useState } from 'react'
import { BookmarkFilledIcon, BookmarkIcon, CommentIcon, HeartIcon, HeartIconFilled, Logo, PauseIcon, PlayIcon, ShareIcon } from '../../Icons'
import { useMantineColorScheme } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'

export function LogoLink({width}:{width?:string}){
  const { colorScheme } = useMantineColorScheme()
  return(
    <Link href={"/"}>
      <Logo p={colorScheme === 'dark' ? '#F7B500':'#CE0009'} s={colorScheme === 'dark' ? '#ffffff':'#000000'}/>
    </Link>
  )
}


export function LikeButton({onClick}:{onClick:()=>void}) {
  const [click,setClick] = useState(false)
  const { colorScheme } = useMantineColorScheme()
  return (
    <ActionIcon onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setClick(!click)
      onClick()

    }}>
      {
        click ? <HeartIconFilled color='red'/>:<HeartIcon color={colorScheme === 'dark' ? "white":"black"}/>
      }
    </ActionIcon>
  )
}

export function BookmarkButton() {
  const [click,setClick] = useState(false)
  const { colorScheme } = useMantineColorScheme();
  return (
    <ActionIcon onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setClick(!click)
    }}>
      {
        click ? <BookmarkFilledIcon color='green'/>:<BookmarkIcon color={colorScheme === 'dark' ? "white":"black"}/>
      }
    </ActionIcon>
  )
}

export function ShareButton() {
  const { colorScheme } = useMantineColorScheme();
  return(
      <ActionIcon onClick={
        (e:React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          showNotification({message:"Copy to clipboard",color:"yellow"})
        }
      }>
        <ShareIcon color={colorScheme === 'dark' ? "white":"black"} />
      </ActionIcon>
    
  )
}

export function CommentButton(){
  const { colorScheme } = useMantineColorScheme();
  return(
    <ActionIcon>
      <CommentIcon color={colorScheme === 'dark' ? "white":"black"} />
    </ActionIcon>
  )
}

export function PlayButton({onClick}:{onClick:()=>void}){
  const { colorScheme } = useMantineColorScheme();
  return(
    <ActionIcon onClick={onClick}>
      <PlayIcon color={colorScheme === 'dark' ? "white":"black"} />
    </ActionIcon>
  )
}

export function PauseButton({onClick}:{onClick:()=>void}){
  const { colorScheme } = useMantineColorScheme();
  return(
    <ActionIcon onClick={onClick}>
      <PauseIcon color={colorScheme === 'dark' ? "white":"black"} />
    </ActionIcon>
  )
}