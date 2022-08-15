import Link from 'next/link'
import React, {useEffect, useRef, useState} from 'react'
import blogData from 'ui/lib/blogData'
import BlogPost from 'ui/components/BlogPost'
import Layout from '../../components/Layout'
import { Button } from 'ui'
function Blog({}) {
  
  // const [synRef,setSynRef] = useState(new SpeechSynthesis);

  // useEffect(() => {
  //   setSynRef(window.speechSynthesis)
  // },[])

function getLoc(){
  window.navigator.geolocation.getCurrentPosition(
      (newPos) => console.log(newPos)
    );
  console.log(window.navigator.language)
}
  // const speak = (text:string) => {
  //   const utterance = new SpeechSynthesisUtterance(text)
  //   utterance.lang = 'en-US'
  //   utterance.rate = 1.0
  //   utterance.pitch = 1.0
  //   utterance.volume = 1.0
  //   synRef.current.speak(utterance)
  // }
  const [isPlaying,setIsPlaying] = useState(false)
  return (
    <Layout>
      <Button onClick={() => getLoc()}>Get Location</Button>
      <BlogPost props={blogData[0]} onPlayClick={
        () => {
          //
        }
      }/>
    </Layout>
  )
}

export default Blog