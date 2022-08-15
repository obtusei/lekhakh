import { TablerIcon } from "@tabler/icons"
import { ReactElement } from "react"
import type { ReactNode } from "react"

export interface HeroProps{
    title:string
    subtitle:string
    description:string
    buttonText:string
}

export interface NavData{
  login:string,
  register:string,
  logout:string,
  account:string,
  saved:string,
  search:string,
  reportBugs:string,
  settings:string,
  feedback:string,
}

export interface BlogProps{
          index:number
          title:string
          description:string
          category:string
          date:string
          writer:{
                    name:string
                    image:string
                    followers:number
                    following:number
                    blogs:number
          }
          tags:string[]
}


export interface SideBarProps{
  label: string;
  icon?:(props:React.ComponentPropsWithoutRef<'svg'>) => JSX.Element;
  href?:string;
  intiallyOpen?: boolean;
  links?: { label: string; link: string }[];
}