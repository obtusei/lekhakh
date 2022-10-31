import React,{useState} from 'react'
import { Modal,showNotification } from 'ui'
import LogIn from 'ui/components/Sign/Login'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import {loginTheUser } from '../api/user'
import axios from 'axios'


function LoginCard() {

  const [loading,setLoading] = useState(false);
  const [inCorrect,setInCorrect] = useState(false);
  const router = useRouter();
  const {t} = useTranslation("register");
  const stringData = {
    title:t("login"),
    subTitle:t("loginToAccount"),
    email:t("email"),
    password:t("password"),
    button:t("loginToAccount"),
    footer:t("notHaveAccount"),
    subFooter:t("register"),
    emailRequired:t("emailIsNotValid"),
    passwordRequired:t("passwordRequired"),
    login:t("login"),
    invalidEmailPassword:t("invalidEmailPassword")
  }
  return (
      <LogIn onSubmit={
        async (values) => {
          const data = {email:values.username,password:values.password}
          axios.post("/auth/login",data,{withCredentials:true})
          .then((res) => {
            showNotification({ message: t('successLog'), color: 'green' });                
            router.push("/");
          }).catch((err) => {
            setInCorrect(true)
            console.log(err.response.data.incorrect && "INCRRE")
          })
          
        }
      }  inCorrect={inCorrect} loading={loading} stringData={stringData}/>
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