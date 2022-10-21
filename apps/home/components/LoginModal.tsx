import React,{useState} from 'react'
import { Modal,showNotification } from 'ui'
import LogIn from 'ui/components/Sign/Login'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import {loginTheUser } from '../api/user'


function LoginCard() {

  const [loading,setLoading] = useState(false);
  const router = useRouter();
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
  return (
      <LogIn onSubmit={
        async (values) => {
          await loginTheUser({email:values.username,password:values.password})
          showNotification({ message: t('successLog'), color: 'green' });                
          router.push("/");
        }
      } loading={loading} stringData={stringData}/>
  )
}

export interface ModalProps {
  myVar: boolean;
  setMyVar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginModal({myVar,setMyVar}: ModalProps){
  const [opened,setOpened] = useState(false)
  return(
    <Modal
        opened={myVar}
        onClose={() => setMyVar(false)}
      >
      <LoginCard/>
    </Modal>
  )
}
export default LoginCard