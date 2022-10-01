import { TableSortProps } from './../../../packages/ui/components/Table';
import useSWR from 'swr'
import axios from 'axios';

const fetcher = (url:any) => axios.get(url,{withCredentials:true}).then(res => res.data)
// export function GetAllUsers () {
//   const {data,error} = useSWR<TableSortProps>('http://localhost:3002/admin/users/all',fetcher)
  
//   return {
//     user: data,
//     isLoading: !error && !data,
//     isError: error
//   }
// }

export function GetReports(){
  const {data,error} = useSWR("/report")
  return{
    reports:data,
    isLoading:!error && !data,
    isError:error
  }
}