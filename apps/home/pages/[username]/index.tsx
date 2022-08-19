import { useRouter } from 'next/router'
import React from 'react'
import { Title } from 'ui'
import BlogCard from 'ui/components/Cards/BlogCard'
import Content from 'ui/components/Profile/Content'
import ProfileCard, { UserProfileCardStringProps } from 'ui/components/Profile/ProfileCard'
import { IBlog, IUser } from 'ui/lib/interfaces'
import { GetUserBlogs } from '../../api/blog'
import { GetSession } from '../../api/user'
import Layout from '../../components/Layout'

function UserProfile() {
  const router = useRouter()
  const {blogData} = GetUserBlogs(String(router.query.username))
  const {session}:{session:{user:IUser}} = GetSession()
  const stringData:UserProfileCardStringProps = {
    blogs: "Blogs",
    followers: "Followers",
    following: "Following",
    follow: "Follow",
    contact: "Contact"
  }
  return (
    <Layout>
      <Title>Name:{blogData?.name}</Title>
          <ProfileCard props={session ? session.user:null} stringData={stringData} />
          <br />
          <div>
            {
              blogData && blogData.blogs.map((blog:IBlog,index) => (
                <div key={index}>
                  <BlogCard props={blog} session={session} />
                </div>
              )
            )}
          </div>
    </Layout>
  )
}

export default UserProfile