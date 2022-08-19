import useSWR,{mutate} from "swr"
import axios from "axios"
import { IBlog } from "ui/lib/interfaces"

const fetcher = (url:any) => axios.get(url,{withCredentials:true}).then(res => res.data)

export function GetTrendingBlogs () { 
  const { data,error } = useSWR<IBlog>('/blog/trending',fetcher)
  return {
    trendData: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetRandomBlogs(){
  const { data,error } = useSWR('/blog/trending',fetcher)
  return {
    trendData: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetSpecificBlog(id:string){
  const { data,error } = useSWR<IBlog>(`/blog/${id}`,fetcher)
  return {
    blogData: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetUserBlogs(username:string){
  const { data,error } = useSWR(`/blog/${username}/blogs`,fetcher)
  return {
    blogData: data,
    isLoading: !error && !data,
    isError: error
  }
}

