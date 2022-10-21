import axios from 'axios';
import { GetServerSideProps, GetStaticProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { Avatar, Button,Stack, Input,Text, Textarea, FileButton, Grid, Title, Divider, DatePicker } from 'ui'
import { GetSession } from '../api/user';
import Layout from '../components/Layout'
import safeJsonStringify from "safe-json-stringify"
import { useDidUpdate } from 'ui';
export async function getServerSideProps () {
  // `getStaticProps` is executed on the server side.
  const res = await axios.get('/auth/info',{withCredentials:true})
  const session = await res.data
  return {
    props: {
      user:session
    }
  }
}
function Settings({user}:{user:any}) {
  
  const {session,isLoading} = GetSession()
  const [name,setName] = useState(session?.user?.name)
  const [username,setUsername] = useState(user?.username)
  const [email,setEmail] = useState(user?.email)
  const [bio,setBio] = useState(user?.bio)
  const [dob,setDob] = useState(user?.dateOfBirth)

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

  const saveChanges = () => {

  }

  const { t } = useTranslation("common")
  // if (user){
    return (
      <Layout>
        <Title>{t("settings")} and {session?.user ? session.user?.username:"Sa"}</Title><br />
        <Text>Something: {JSON.stringify(user)}</Text>
        <Divider/>
        <Grid grow style={{padding:"20px"}}>
          <Grid.Col span={4}>
            <Stack align={"center"} spacing={0}>
              <Avatar size={'xl'} radius={200} color="red">{user?.name}</Avatar>
              <FileButton onChange={(file) => {
                if (file != null){
                  handleUploadProfile(file);
                }
              }} accept="image/png,image/jpeg">
                {(props) => <Button {...props} variant="white">{t("changeProfile")}</Button>}
              </FileButton>
              <br />
              <Text color={"dimmed"}>
                #Tips and rules <br />
                • Help people discover your account by using the name youre known by: either your full name, nickname, or business name. <br />
                • Your username must be <span style={{fontWeight:"bold"}}>unique</span>
              </Text>
            </Stack>
          </Grid.Col>
        <Grid.Col span={4} style={{minWidth:"300px"}}>
          <Stack>
            <Input.Wrapper label={t("name")}>
            <Input placeholder={""} value={name} onChange={(e) => setName(e.target.value)}/>
          </Input.Wrapper>

          <Input.Wrapper label={t("username")}>
            <Input placeholder="" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Input.Wrapper>

          <Input.Wrapper label={t("email")}>
            <Input placeholder="" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Input.Wrapper>

          <Textarea
          placeholder=""
          label={t('yourBio')}
          value={bio} onChange={(e) => setBio(e.target.value)}
          />

          <DatePicker placeholder={t("pickDate")} label={t("dob")} value={dob} onChange={(e) => setDob(e)}/>

          <Button variant='subtle'>{t("changePassword")}</Button>

          <Button>{t("save")}</Button>
          </Stack>
        </Grid.Col>
        </Grid>
      </Layout>
    )
  // }
  // else{
  //   return <>Not logged in</>
  // }
}

export default Settings