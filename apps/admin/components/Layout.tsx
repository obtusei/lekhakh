import React from 'react'
import { ADMIN_NAVDATA, NAVDATA, Shell } from 'ui'
import { NavData } from 'ui/lib/interfaces'
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
  return (
    <Shell isNavHidden={isNavHidden} sideBardata={ADMIN_NAVDATA} navData={navData}>  
      {children}
    </Shell>
  )
}

export default Layout