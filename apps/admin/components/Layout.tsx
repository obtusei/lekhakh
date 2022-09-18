import React from 'react'
import { ADMIN_NAVDATA, NAVDATA, Shell } from 'ui'

type Props = {
  children: React.ReactNode;
  isNavHidden?: boolean;
}

function Layout({children,isNavHidden}:Props) {
  return (
    // <Shell data={ADMIN_NAVDATA} isNavHidden={isNavHidden}>
     <>
      {children}
      </>
    // {/* </Shell> */}
  )
}

export default Layout