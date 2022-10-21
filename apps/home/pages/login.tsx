import React, { useEffect, useState } from 'react'
import { Button, Title, UserSign} from 'ui'
import useSWR from 'swr'
import LogIn from 'ui/components/Sign/Login';
import { GetSession, loginTheUser,} from '../api/user';
import {useRouter} from "next/router";
import { showNotification } from 'ui';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import LoginCard from '../components/LoginModal';
function Login() {

  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const {session,isLoading} = GetSession();
  const {t} = useTranslation("register");
  const stringData = {
    title:t("login"),
    subTitle:t("createAnAccount"),
    email:t("email"),
    password:t("password"),
    button:t("loginToAccount"),
    footer:t("notHaveAccount"),
    subFooter:t("register"),
    emailRequired:t("emailIsNotValid"),
    passwordRequired:t("passwordRequired"),
  }
  
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