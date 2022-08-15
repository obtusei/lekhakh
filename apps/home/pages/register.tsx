import React, { useState } from 'react'
import { UserSign} from 'ui'
import useSWR from 'swr'
import LogIn from 'ui/components/Sign/Login';
import RegisterUser, { RegisterStringProps } from 'ui/components/Sign/Register';
// import { RegisterTheUser } from '../utils/user-api';
import {useRouter} from "next/router";
import { showNotification } from 'ui';
import useTranslation from 'next-translate/useTranslation';
function Register() {
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const {t} = useTranslation();
  const stringData:RegisterStringProps = {
    title:t("register:register"),
    subTitle:t("register:createAnAccount"),
    name:t("register:name"),
    username:t("register:username"),
    email:t("register:email"),
    password:t("register:password"),
    confirmPassword:t("register:confirmPassword"),
    button:t("register:register"),
    footer:t("register:alreadyHaveAccount"),
    subFooter:t("register:login"),
    nameRequired:t("register:nameRequired"),
    usernameRequired:t("register:usernameRequired"),
    emailRequired:t("register:emailIsNotValid"),
    passwordRequired:t("register:passwordRequired"),
    confirmPasswordRequired:t("register:passwordIsNotMatch")
  }
  return (
    <div>
          <UserSign>
            <RegisterUser onSubmit={
              async (values) => {
                // await RegisterTheUser(values)
                setLoading(true);
                const { name,username, email, password } = values
                // await RegisterTheUser({ name, email,username, password})
                setLoading(false);
                showNotification({ message: 'Successfully registered', color: 'green' });
                router.push('/login');
                
              }
              
            } loading={loading} stringData={stringData}/>
          </UserSign>
    </div>
  )
}

export default Register