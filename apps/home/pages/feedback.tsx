import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Divider, Group, Stack, Textarea, TextInput, Title } from 'ui'
import Layout from '../components/Layout'

type Props = {}

function Feedback({}: Props) {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [title,setTitle] = useState("")
  const [message,setMessage] = useState("")
  const router = useRouter();
  
  const sendFeedback = async () => {
    const data = {name,email,title,message}
    try{
      await axios.post("/feedback",data)
      alert("Feedbacked successfully")
      router.push("/")
    }
    catch{
      console.log("error posting the feedback");
    }
  }
  return (
    <Layout>
      <Title>Feedback</Title>
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
        label="Your feedback"
        placeholder="Why this sucks?"
        variant='filled'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      </Stack>
      <br />
      <Group>
        <Button onClick={sendFeedback}>Send a feedback</Button>
        <Button variant='light' onClick={() => router.back()}>Go Back</Button>
      </Group>
    </Layout>
  )
}

export default Feedback