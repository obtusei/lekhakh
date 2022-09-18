import { TableSortProps } from './../../../packages/ui/components/Table';
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function GetAllUsers () {
  const {data,error} = useSWR<TableSortProps>('http://localhost:3002/admin/users/all',fetcher)
  
  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}