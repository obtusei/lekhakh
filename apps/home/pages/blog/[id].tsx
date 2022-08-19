import Link from 'next/link'
import React, {useEffect, useRef, useState} from 'react'
import blogData from 'ui/lib/blogData'
import BlogPost from 'ui/components/BlogPost'
import Layout from '../../components/Layout'
import { Button } from 'ui'
import { useRouter } from 'next/router'
import { GetSpecificBlog } from '../../api/blog'
function Blog({}) {
  
  // const [synRef,setSynRef] = useState(new SpeechSynthesis);

  // useEffect(() => {
  //   setSynRef(window.speechSynthesis)
  // },[])

// function getLoc(){
//   window.navigator.geolocation.getCurrentPosition(
//       (newPos) => console.log(newPos)
//     );
//   console.log(window.navigator.language)
// }
  const router = useRouter()
  const id:string = String(router.query.id);
  const {blogData} = GetSpecificBlog(id) 

  const [isPlaying,setIsPlaying] = useState(false)
  return (
    <Layout>
      <BlogPost props={blogData} onPlayClick={
        () => {
          //
        }
      }/>
    </Layout>
  )
}

export default Blog