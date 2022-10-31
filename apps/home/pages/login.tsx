import { useEffect } from 'react'
import { UserSign} from 'ui'
import { GetSession} from '../api/user';
import {useRouter} from "next/router";
import LoginCard from '../components/LoginModal';

function Login() {
  const router = useRouter();
  const {session,isLoading} = GetSession();
  useEffect(() => {
    if (session && session.user){
      router.push("/")
    }
  })

  if (session && session.user){
      return <></>
  }
  else if (isLoading){
    return <>Loading...</>
  }
  else{
    return (
    <div>
          <UserSign>   
            <LoginCard/>
          </UserSign>
    </div>
  )
  }
}

export default Login