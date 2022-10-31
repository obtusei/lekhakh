import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {}

function Logout({}: Props) {

  const router = useRouter()
  useEffect(() => {
    axios.get("/auth/logout",{withCredentials:true})
    .then((res) => {
      console.log("Logging out...")
      router.push("/login")
    })
    .catch((err) => {
      console.log("ERROR loggging out");
      
    })
  })
  return <></>
}

export default Logout