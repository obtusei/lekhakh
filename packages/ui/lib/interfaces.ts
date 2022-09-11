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

export interface IBlog{
          id:string,
          title:string,
          content:string,
          createdAt:string,
          updatedAt:string,
          viewCount:number,
          category:ICategory,
          user:IUser
          tag:ITag[]
}

export interface ICategory{
  id:string,
  name:string
}

export interface ITag{
  id:string,
  name:string,
}

export interface IUser{
  id:string,
  name:string,
  email:string,
  emailVerified:string,
  isVerifiedUser:boolean,
  isWriter:boolean,
  isPublicAccount:boolean,
  dataOfBirth:string,
  username:string,
  createdAt:string,
  bio:string,
  image:string,
  role:string,
  blogsCount?:number,
  followers?:number,
  following?:number
  blogs?:IBlog[]
}


export interface SideBarProps{
  label: string;
  icon?:(props:React.ComponentPropsWithoutRef<'svg'>) => JSX.Element;
  href?:string;
  intiallyOpen?: boolean;
  links?: { label: string; link: string }[];
}