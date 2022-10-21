import Link from 'next/link'
import React, {useEffect, useRef, useState} from 'react'
import blogData from 'ui/lib/blogData'
import BlogPost from 'ui/components/BlogPost'
import Layout from '../../components/Layout'
import { Button, Text } from 'ui'
import { useRouter } from 'next/router'
import { GetBlogComments, GetSpecificBlog } from '../../api/blog'
import { useScrollIntoView } from 'ui'
import axios from 'axios'
import { mutate } from 'swr'
import { GetStaticProps } from 'next'
import { IBlog } from 'ui/lib/interfaces'

export async function getStaticPaths() {
  const response = await axios.get(`/blog`)
  const blogs = response.data
  const paths = blogs.map((blog:IBlog) => ({
    params: {
      id:blog.id
    }
  }))
  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const res = await axios.get("/blog/" + id)
  const blogData = await res.data;
  return {
    props: { 
      blog:blogData
    },
  }
}

function Blog({}) {
  const router = useRouter()
  const id:string = String(router.query.id);
  const {blogData} = GetSpecificBlog(id) 
  const comments = GetBlogComments(id)
  const doComment = (comment:string) => {
      axios.post("/blog/comment",{comment:comment,blogId:id},{withCredentials:true})
      .then((res) => {
        mutate(`/blog/comment/${id}`)
      })
      .catch((err) => console.log("ERROR"))
    }
    
  const delComment = (comment:string) => {
    axios.delete(`/blog/comment/${comment}`,{withCredentials:true})
    .then((res) => {
      mutate(`/blog/comment/${id}`)
    })
    .catch((err) => console.log("ERROR"))

  }
  
  const [isPlaying,setIsPlaying] = useState(false)
  const speak = (text:string) => {
      const synRef = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(text)
      synRef.speak(utterance)
      setIsPlaying(true)
    }
  return (
    <Layout>
      <BlogPost props={blogData} onPlayClick={
        () => {
          speak("HEllo")
        }
      } goToComment={Boolean(router.query.comment)} doComment={doComment} comments={comments} delComment={delComment} />
    </Layout>
  )
}

export default Blog