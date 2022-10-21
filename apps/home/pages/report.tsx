import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Divider, Group, Stack, Textarea, TextInput, Title } from 'ui'
import Layout from '../components/Layout'

type Props = {}

function Report({}: Props) {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [title,setTitle] = useState("")
  const [message,setMessage] = useState("")
  const router = useRouter();
  const sendReport = async () => {
    const data = {name,email,title,message}
    try{
      await axios.post("/report",data)
      alert("Reported successfully")
      router.push("/")
    }
    catch{
      console.log("error posting the report");
    }
  }
  return (
    <Layout>
      <Title>Report</Title>
      <br />
      <Stack>
        <TextInput
        label='Your name'
        placeholder="John Doe"
        variant='filled'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        label='Email'
        placeholder="example@example.com"
        variant='filled'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </Stack>
      <br />
      <Divider/>
      <br />
      <Stack>
        <TextInput
        label='Title'
        placeholder="Something isn't right"
        variant='filled'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        label="Your report"
        placeholder="Why this sucks?"
        variant='filled'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      </Stack>
      <br />
      <Group>
        <Button onClick={sendReport}>Send a report</Button>
        <Button variant='light' onClick={() => router.back()}>Go Back</Button>
      </Group>
    </Layout>
  )
}

export default Report