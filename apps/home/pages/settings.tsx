import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { Avatar, Button,Stack, Input,Text, Textarea, FileButton, Grid, Title, Divider, DatePicker, Footer, Center } from 'ui'
import LowerMenu from 'ui/components/LowerMenu';
import { getInitial } from 'ui/lib/logics';
import { GetSession } from '../api/user';
import Layout from '../components/Layout'

function Settings() {
  
  const {session,isLoading} = GetSession()
  const [name,setName] = useState(session?.user?.name)
  const [username,setUsername] = useState(session?.user?.username)
  const [email,setEmail] = useState(session?.user?.email)
  const [bio,setBio] = useState(session?.user?.bio)
  const time = new Date(session?.user?.dataOfBirth != null ? session?.user?.dataOfBirth:Date.now())
  const today = new Date(Date.now())
  const [dob,setDob] = useState(time)
  const [usernameError,setUsernameError] = useState(false)
  const [emailError,setEmailError] = useState(false)

  const handleUploadProfile = (file:File) => {
    const formData = new FormData()  
    if (file != null){
      formData.append('file', file);
      formData.append('originalname', file.name);
      axios.post("/image/upload",formData,{
        headers:{
          "Content-Type": "multipart/form-data",
        },
        withCredentials:true
      })
      .then((res) => {
        mutate("/auth/info")
        console.log(res)
      })
      .catch((err) => {
        console.log("ERROR")
      })
    }else{
      alert("FILE IS NULL")
    }
    
  }
  const router = useRouter()
  const saveChanges = () => {
    try{
      const data = {
        name:name,
        username:username,
        email:email,
        bio:bio
      }
      axios.put("/auth/info",data,{withCredentials:true})
      .then((res) => {
        // router.push("/")
        console.log(`DATA:::: ${res.data} :::::`)
      })
      .catch((error) => {
        if (error.response.data?.username){

          setUsernameError(true)
        }
        else if (error.response.data.email){
          setEmailError(true)
        }
      })
    }
    catch{
      console.log("ERROR making changes")
    }
  }

  const { t } = useTranslation()
  // if (user){
    return (
      <Layout>
        <Title>{t("common:settings")}</Title><br />
        <Divider/>
        <Grid grow style={{padding:"20px"}}>
          <Grid.Col span={4}>
            <Stack align={"center"} spacing={0}>
              <Avatar size={'xl'} src={session?.user?.image != null ? `http://localhost:3002${session?.user?.image}`:""} radius={200} color="red">{getInitial(session?.user.name || "")}</Avatar>
              <FileButton onChange={(file) => {
                if (file != null){
                  handleUploadProfile(file);
                }
              }} accept="image/png,image/jpeg">
                {(props) => <Button {...props} variant="white">{t("common:changeProfile")}</Button>}
              </FileButton>
              <br />
              <Text color={"dimmed"}>
                #Tips and rules <br />
                • Help people discover your account by using the name you are known by: either your full name, nickname, or business name. <br />
                • Your username must be <span style={{fontWeight:"bold"}}>unique</span>
              </Text>
            </Stack>
          </Grid.Col>
        <Grid.Col span={4} style={{minWidth:"300px"}}>
          <Stack>
            <Input.Wrapper label={t("register:name")}>
            <Input placeholder={""} value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
          </Input.Wrapper>

          <Input.Wrapper label={t("register:username")} error={usernameError ? t("register:usernameAlreadyExists"):""} onKeyDown={() => setUsernameError(false)}>
            <Input placeholder="" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
          </Input.Wrapper>

          <Input.Wrapper label={t("register:email")} error={emailError ? t("register:emailAlreadyExists"):""} onKeyDown={() => setEmailError(false)}>
            <Input placeholder="" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
          </Input.Wrapper>

          <Textarea
          placeholder=""
          label={t('register:bio')}
          value={bio} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
          />
          <Button onClick={() => saveChanges()}>{t("register:save")}</Button>
          </Stack>
        </Grid.Col>
        </Grid>
        <br />
        <Center style={{width:"100%"}}>
          <LowerMenu/>
        </Center>
      </Layout>
    )
  // }
  // else{
  //   return <>Not logged in</>
  // }
}

export default Settings