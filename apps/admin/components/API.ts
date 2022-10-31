import { TableSortProps } from './../../../packages/ui/components/Table';
import useSWR from 'swr'
import axios from 'axios';

const fetcher = (url:any) => axios.get(url,{withCredentials:true}).then(res => res.data)

export function GetSession () {
  const {data,error} = useSWR('/auth/info',fetcher)
  
  return {
    session: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetAllUsers () {
  const {data,error} = useSWR('/admin/users/all',fetcher)
  
  return {
    users: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetAllBlogs () {
  const {data,error} = useSWR('/admin/users/all/blogs',fetcher)
  
  return {
    blogs: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetAllAdmins () {
  const {data,error} = useSWR('/admin/users/admin',fetcher)
  
  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}


export function SearchUsers(query:string){
  const {data,error} =useSWR(`/user/search?q=${query}`,fetcher)
  return{
    data:data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetCategories(){
  const {data,error} = useSWR('/admin/categories',fetcher,{ refreshInterval: 0 });
  return{
    data:data,
    isLoading:!error && !data,
    isError:error
  }
}

export function GetTags(){
  const {data,error} = useSWR('/admin/tags',fetcher,{ refreshInterval: 0 });
  return{
    data:data,
    isLoading:!error && !data,
    isError:error
  }
}

export function GetReports(){
  const {data,error} = useSWR("/report")
  return{
    reports:data,
    isLoading:!error && !data,
    isError:error
  }
}

export function GetFeedbacks(){
  const {data,error} = useSWR("/feedback")
  return{
    feedbacks:data,
    isLoading:!error && !data,
    isError:error
  }
}

export function GetTotals(){
  const {data,error} = useSWR("/admin/users/total")
  return{
    totals:data,
    isLoading:!error && !data,
    isError:error
  }
}