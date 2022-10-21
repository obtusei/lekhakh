import useSWR,{mutate} from "swr"
import axios from "axios"
import { IUser } from "ui/lib/interfaces"

interface SignUpProps{
  name?:string,
  email:string,
  username?:string,
  password:string,
}

const fetcher = (url:any) => axios.get(url,{withCredentials:true}).then(res => res.data)

export async function registerTheUser({name,email,username,password}:SignUpProps){
  try{
    await axios.post("/auth/register",{name,email,username,password},{withCredentials:true})
  }
  catch{
    console.log("Error while registering the new user")
  }
}

export async function loginTheUser({email,password}:SignUpProps){
  try{
    await axios.post("/auth/login",{email,password},{withCredentials:true})
  }
  catch{
    console.log("Error while login")
  }
}

export async function createBlogByUser({ title,content,category,tags }: any) {
  try {
    const createBlog = await axios.post("/blog/create", { title, content, category, tags }, { withCredentials: true })
    console.log(createBlog.data)
  }
  catch {
    console.log("ERROR creating the blog")
  }
}

export async function followSomeone(userData:IUser,doesFollow:any){
  try{
      const data = {user:userData.username}
      if (doesFollow?.data?.doesFollow){
        axios.delete(`/user/follow/${data.user}`,{withCredentials:true})
        .then((res) => {
          mutate(`/user/following/${userData.id}`)
          mutate("/user/" + data.user)
        }).catch((err) => console.log("Error while unfollowing"))
      }else{
        
        axios.post('/user/follow',data,{withCredentials:true})
        .then((res) => {
          mutate(`/user/following/${userData.id}`)
          mutate("/user/" + data.user)
        }).catch((err) => console.log("Error while following"))
      }
    }
    catch{
      console.log("Error while handling the following");
    }
}

//  "user": {
//     "id": "cl67s18dk0000cuxks9frcd44",
//     "name": "Test 01",
//     "email": "test01@gmail.com",
//     "emailVerified": null,
//     "isVerifiedUser": false,
//     "isWriter": true,
//     "isPublicAccount": false,
//     "dateOfBirth": null,
//     "username": "test01",
//     "password": "$2b$10$JCHlhv71C2dmOoeuoToP4.A0LlIJn7s2S0z5V/tNCiHxVNng2CbIS",
//     "createdAt": "2022-07-30T10:54:50.025Z",
//     "bio": null,
//     "image": null,
//     "role": "USER"
// }

export function GetSession () { 
  const { data,error } = useSWR('/auth/info',fetcher)
  return {
    session: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetUserbyUsername(username:string) { 
  const { data,error } = useSWR(`/user/${username}`,fetcher)
  // const { data,error } = useSWR(['user',username], fetcher)
  return {
    userData: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetUserFollowers(){
  const {data,error} = useSWR('/user/followers',fetcher)
  return {
    followers: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetUserFollowing(){
  const {data,error} = useSWR('/user/following',fetcher)
  return {
    following: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetUserSaved(){
  const {data,error} = useSWR('/user/saved',fetcher)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}


export function GetCategories () {
  const { data,error } = useSWR('/admin/categories')
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetTags (take:number = 100) {
  const { data,error } = useSWR(`/admin/tags?take=${take}`)
  return {
    tags: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function SearchTag(term:string) {
  const { data,error } = useSWR(`/admin/tags/search/${term}`)
  return {
    tags: data,
    isLoading: !error && !data,
    isError: error
  }
}

// export async function PostCategories(categories,newData){
//   try{
//     const data = await axios.post('/admin/categories', newData)
//     mutate('admin/categories', categories, false)
//   }
//   catch{
//     console.log("ERROR")
//   }
// }

export function GetSpotlightAction () {
  const { data,error } = useSWR('/admin/tags')
  return {
    tags: data,
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

export function DoesFollow(userId:string){
  const {data,error} = useSWR(`/user/following/${userId}`,fetcher)
  return{
    data:data,
    isLoading: !error && !data,
    isError: error
  }
}

export function DoesUsernameExist(username:string){
  const {data,error} = useSWR(`/user/exist/username/${username}`,fetcher)
  return{
    data:data,
    isLoading: !error && !data,
    isError: error
  }
}

export function DoesUserEmailExist(email:string){
  const {data,error} = useSWR(`/user/exist/email/${email}`,fetcher)
  return{
    data:data,
    isLoading: !error && !data,
    isError: error
  }
}

interface SpotlightActionProps{
  id:string
  title:string
  
}

    // id?: string;
    // /** Action title, topmost large text, used for default filtering */
    // title: string;
    // /** Action description, small text displayed after title, used for default filtering */
    // description?: string;
    // /** Action group, used to render group label */
    // group?: string;
    // /** Keywords that are used for default filtering, not displayed anywhere, can be a string: "react,router,javascript" or an array: ['react', 'router', 'javascript'] */
    // keywords?: string | string[];
    // /** Decorative icon */
    // icon?: ReactNode;
    // /** Function that is called when action is triggered */
    // onTrigger(action: SpotlightAction): void;
    // /** If the spotlight is closed after clicking on this action */
    // closeOnTrigger?: boolean;
    // /** Any other properties that will be consumed by SpotlightProvider */
    // [key: string]: any;