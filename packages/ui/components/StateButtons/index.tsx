import { ActionIcon, Alert } from '@mantine/core'
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


export function LikeButton({onClick,doesLike}:{onClick:()=>void,doesLike:boolean}) {
  
  const { colorScheme } = useMantineColorScheme()
  return (
    <ActionIcon onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      onClick()
    }}>
      {
        doesLike ? <HeartIconFilled color='red'/>:<HeartIcon color={colorScheme === 'dark' ? "white":"black"}/>
      }
    </ActionIcon>
  )
}

export function BookmarkButton({onClick,doesSave}:{onClick:() => void,doesSave:boolean}) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <ActionIcon onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      onClick()
    }}>
      {
        doesSave ? <BookmarkFilledIcon color='green'/>:<BookmarkIcon color={colorScheme === 'dark' ? "white":"black"}/>
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

export function CommentButton({onClick}:{onClick:() => void}){
  const { colorScheme } = useMantineColorScheme();
  return(
    <ActionIcon onClick={() =>onClick()}>
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