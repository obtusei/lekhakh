import useSWR,{mutate} from "swr"
import axios from "axios"

interface RegisterProps{
  name?:string,
  email:string,
  username?:string,
  password:string,
}

const fetcher = (url:any) => axios.get(url,{withCredentials:true}).then(res => res.data)

// export async function RegisterTheUser({name,email,username,password}:RegisterProps){
//   try{
//     const register = await axios.post("/auth/register",{name,email,username,password})
//   }
//   catch{
//     console.log("ERROR registering the new user")
//   }
// }

// export async function LoginTheUser({email,password}){
//   try{
//     const login = await axios.post("/auth/login",{email,password})
//     console.log(login)
//   }
//   catch{
//     console.log("ERROR login")
//   }
// }

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


export function GetCategories () {
  const { data,error } = useSWR('/admin/categories')
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function GetTags () {
  const { data,error } = useSWR('/admin/tags')
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