import useSWR,{mutate} from "swr"
import axios from "axios"
import { IBlog, IUser } from "ui/lib/interfaces"

const fetcher = (url:any) => axios.get(url,{withCredentials:true}).then(res => res.data)

// Trending
export function GetTrendingBlogs () { 
  const { data,error } = useSWR<[IBlog]>('/blog/trending',fetcher)
  return {
    trendData: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function GetTrendofTheDay () { 
  const { data,error } = useSWR<[IBlog]>('/blog/trendoftheday',fetcher)
  return {
    trendoftheday: data,
    isLoading: !error && !data,
    isError: error,
  }
}

// Discover
export function GetTopBlogs () { 
  const { data,error } = useSWR<[IBlog]>('/blog/top',fetcher)
  return {
    topData: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function GetBlogComments(id:string) { 
  const { data,error } = useSWR(`/blog/comment/${id}`,fetcher)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function GetDiscoverBlogs () { 
  const { data,error } = useSWR('/blog/discover',fetcher,{revalidateOnFocus:false,refreshInterval:0})
  return {
    discoverData: data,
    isLoading: !error && !data,
    isError: error
  }
}

//Hot Writers
export function GetHotWriters () { 
  const { data,error } = useSWR<[IUser]>('/writer/hot',fetcher,{revalidateOnFocus:false,refreshInterval:0})
  return {
    hotWriters: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetWriters () { 
  const { data,error } = useSWR('/writer/category',fetcher,{revalidateOnFocus:false,refreshInterval:0})
  return {
    writerData: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetRandomBlogs(){
  const { data,error } = useSWR<IBlog>('/blog/trending',fetcher)
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

export function GetUserFollowingBlogs(){
  const { data,error } = useSWR<[IBlog]>(`/blog/following`,fetcher)
  return {
    followingData: data,
    isLoading: !error && !data,
    isError: error
  }
}


export function GetCategoryBlogAndWriter(category:string){
    const {data:writersData,error:writerError} = useSWR(`/writer/category/${category}`,fetcher)
    const {data:blogs,error} = useSWR(`/blog/category/${category}`,fetcher)
    return{
      blogs:blogs,
      writers:writersData,
      blogError:error,
      writerError:writerError
    }
}

export function SearchBlogs(query:string){
  const { data,error } = useSWR<[IBlog]>(`/blog/search?q=${query}`,fetcher)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function DoesUserLikeBlog (id:string) { 
  const { data,error } = useSWR(`/blog/isLiked/${id}`,fetcher)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function DoesUserSaveBlog (id:string) { 
  const { data,error } = useSWR(`/blog/isSaved/${id}`,fetcher)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
