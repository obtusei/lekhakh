import { useState,useEffect } from 'react'
import { UserSign} from 'ui'
import RegisterUser from 'ui/components/Sign/Register';
import { registerTheUser,GetSession } from '../api/user';
import {useRouter} from "next/router";
import { showNotification } from 'ui';
import useTranslation from 'next-translate/useTranslation';

function Register() {
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const {t} = useTranslation("register");
  const {session,isLoading} = GetSession()
  const registerData = {
    title:t("register"),
    subTitle:t("createAnAccount"),
    name:t("name"),
    username:t("username"),
    email:t("email"),
    password:t("password"),
    confirmPassword:t("confirmPassword"),
    button:t("register"),
    footer:t("alreadyHaveAccount"),
    subFooter:t("login"),
    nameRequired:t("nameRequired"),
    usernameRequired:t("usernameRequired"),
    emailRequired:t("emailIsNotValid"),
    passwordRequired:t("passwordRequired"),
    confirmPasswordRequired:t("passwordIsNotMatch"),
    pname:t("pname"),
    pusername:t("pusername"),
    pemail:t("pemail"),
    ppassword:t("password"),
    pcpassword:t("confirmPassword"),
    usernameExist:t("usernameAlreadyExists"),
    emailExist:t("emailAlreadyExists"),
    fillName:t("fillName"),
    fillEmail:t("fillEmail"),
    fillUsername:t("fillUsername"),
    fillPassword:t("fillPassword"),
    passwordIsNotMatch:t("passwordIsNotMatch")
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
              <RegisterUser onSubmit={
                async (values) => {
                  setLoading(true);
                  const { name,username, email, password } = values
                  await registerTheUser({ name, email,username, password})
                  showNotification({ message: t('successfullyRegistered'), color: 'green' });
                  setLoading(false);
                  router.push('/login');
                }
              } loading={loading} stringData={registerData}/>
            </UserSign>
      </div>
    )
  }
}

export default Register