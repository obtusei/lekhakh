import Router from 'next/router';
import React, { useEffect } from 'react'
import { ADMIN_NAVDATA, NAVDATA, Shell } from 'ui'
import { NavData } from 'ui/lib/interfaces'
import { GetSession } from './API';
import NotAdmin from './NotAdmin';
type Props = {
  children: React.ReactNode;
  isNavHidden?: boolean;
}

function Layout({children,isNavHidden}:Props) {
  const navData:NavData = {
    login:"Login",
    register:"Be One",
    logout:"Logout",
    account:"Account",
    saved:"Saved",
    search:"Search",
    reportBugs:"Report Bugs",
    settings:"Settings",
    feedback:"Feedback",
  }
  const {session,isLoading} = GetSession()
  useEffect(() => {
    if (session){
      if (!session.user){
      Router.push("/login")
    }
    }
  })
  if (session){
    if (session.user){
      if (session.user.role === "ADMIN"){
          return (
        <Shell isNavHidden={isNavHidden} sideBardata={ADMIN_NAVDATA} navData={navData} session={session != null ? session.user : null} isLoading={isLoading} isAdmin>  
          {children}
        </Shell>
      )
      }else{
        return (
          <>
          <NotAdmin/>
          </>
        )
      }
    }else{
      return <></>
    }
  }else{
    return <></>
  }
}

export default Layout