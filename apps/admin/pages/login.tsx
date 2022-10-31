import React, { useEffect, useState } from 'react'
import { Button, RegisterStringProps, Title, UserSign} from 'ui'
import useSWR from 'swr'
import LogIn from 'ui/components/Sign/Login';
// import { GetSession, LoginTheUser, RegisterTheUser } from '../utils/user-api';
import {useRouter} from "next/router";
import { showNotification } from 'ui';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
function Login() {
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  // const {session,isLoading} = GetSession();
  const [session,SetSession] = useState(null);
  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3002/auth/info",
    }).then((res) => {
      SetSession(res.data.user.name);
      console.log(res.data);
    });
  };
  const {t} = useTranslation();
  const stringData:RegisterStringProps = {
    title:"Admin Login",
    subTitle:"Only Admins are allowed to login",
    email:"Email",
    password:"Password",
    button:"Login",
    footer:"Don't have an account",
    subFooter:"Register",
    emailRequired:"Email is not valid",
    passwordRequired:"Password is required",
  }
  
  return (
    <div>
          <UserSign>   
            <LogIn onSubmit={
              async (values) => {
                axios({
                  method: "POST",
                  data: {
                    email: "test01@gmail.com",
                    password: "test01",
                  },
                  withCredentials: true,
                  url: "http://localhost:3002/auth/login",
                }).then((res) => {
                  console.log("***********************************")
                  console.log(res)
                  router.push("/");
                });
                
              }
            } loading={loading} stringData={stringData}/>
          </UserSign>
    </div>
  )
}

export default Login