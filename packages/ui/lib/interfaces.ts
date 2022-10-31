import { TablerIcon } from "@tabler/icons"
import { ReactElement } from "react"
import type { ReactNode } from "react"

export interface HeroProps{
    title:string
    subtitle:string
    description:string
    buttonText:string
}

export interface IAPI{
  data: any;
  isLoading: boolean;
  isError: any;
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
          tag:ITag[],
          likes:ILike[],
          comments:any[]
}

export interface ILike{
  id:string,
  userId:string,
  blogId:string
}

export interface IComment{
  id:string,
  text:string,
  userId:string,
  blogId:string,
  createdAt:string
  User?:IUser
  blog?:IBlog

}

export interface ICategory{
  id:string,
  name:string
  blogs?:IBlog[]
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
  _count?: {
      blogs:number,
      followers:number,
      following: number
    },
  blogs?:IBlog[]
}


export interface SideBarProps{
  label: string;
  icon?:(props:React.ComponentPropsWithoutRef<'svg'>) => JSX.Element;
  href?:string;
  intiallyOpen?: boolean;
  links?: { label: string; link: string }[];
}